import test from "node:test";
import assert from "node:assert/strict";
import QRCode from "qrcode";

import {
  LiveSessionManager,
  normalizeRoomCode,
  generateCollisionResistantCode,
  toPublicSessionState,
} from "../lib/live/liveSessionManager";
import { getCanonicalJoinUrl } from "../components/competitions/SessionQrCard";

test("Live Arena - Code Normalization & Collision Resistance", () => {
  // Test code normalization
  assert.equal(normalizeRoomCode("qd-8492"), "QD-8492");
  assert.equal(normalizeRoomCode("QD 8492"), "QD-8492");
  assert.equal(normalizeRoomCode("8492"), "QD-8492");
  assert.equal(normalizeRoomCode("  qd-a7x9  "), "QD-A7X9");
  assert.equal(normalizeRoomCode(""), "");

  // Test collision-resistant code generator
  const code1 = generateCollisionResistantCode();
  const code2 = generateCollisionResistantCode();
  assert.match(code1, /^QD-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{4}$/);
  assert.match(code2, /^QD-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{4}$/);
});

test("Scenario A: Host creates live session and receives secret token", () => {
  const { session, hostSecret } = LiveSessionManager.createSession({
    title: "State Mathematics Olympiad",
    hostName: "Prof. Sarah Jenkins",
    settings: {
      durationMinutes: 30,
      maxParticipants: 100,
      negativeMarking: true,
      timeBonus: true,
      timePerQuestionSeconds: 30,
    },
  });

  assert.ok(session.code.startsWith("QD-"));
  assert.equal(session.status, "WAITING");
  assert.equal(session.stage, "lobby");
  assert.ok(hostSecret.length > 10);
  assert.equal(session.hostSecret, hostSecret);
  assert.equal(session.questions.length >= 3, true);

  // Verify public state hides secret
  const publicState = toPublicSessionState(session);
  assert.equal((publicState as any).hostSecret, undefined);
  assert.equal(publicState.status, "WAITING");
});

test("Scenario B & C: Three independent participants join via QR, direct link, and PIN", () => {
  const { session, hostSecret } = LiveSessionManager.createSession({
    title: "Physics Challenge 2026",
    hostName: "Oakridge Academy",
  });
  const code = session.code;

  // Participant A joins via QR code URL
  const joinA = LiveSessionManager.joinSession(code, {
    name: "Alex Rivera",
    userId: "usr-a",
  });
  assert.equal(joinA.success, true);
  assert.ok(joinA.participantId);
  assert.equal(joinA.session.participantsCount, 1);

  // Participant B joins via room PIN (case-insensitive with whitespace)
  const joinB = LiveSessionManager.joinSession(`  ${code.toLowerCase()} `, {
    name: "Elena Rostova",
    userId: "usr-b",
  });
  assert.equal(joinB.success, true);
  assert.equal(joinB.session.participantsCount, 2);

  // Participant C joins via direct link
  const joinC = LiveSessionManager.joinSession(code, {
    name: "Marcus Sterling",
    userId: "usr-c",
  });
  assert.equal(joinC.success, true);
  assert.equal(joinC.session.participantsCount, 3);

  // Duplicate enrollment of Participant A should be handled idempotently
  const joinADup = LiveSessionManager.joinSession(code, {
    id: joinA.participantId,
    name: "Alex Rivera",
  });
  assert.equal(joinADup.success, true);
  assert.equal(joinADup.participantId, joinA.participantId);
  assert.equal(joinADup.session.participantsCount, 3); // Still 3, no duplicate!
});

test("Scenario D: Host starts competition, delivers synchronized question without answer key leaks", () => {
  const { session, hostSecret } = LiveSessionManager.createSession({
    title: "Science Bowl",
  });
  const code = session.code;

  // Enroll two participants
  const p1 = LiveSessionManager.joinSession(code, { name: "Player 1" });
  const p2 = LiveSessionManager.joinSession(code, { name: "Player 2" });

  // Host starts the game
  const startResult = LiveSessionManager.executeHostAction(code, hostSecret, "start");
  assert.equal(startResult.success, true);
  assert.equal(startResult.session?.status, "ACTIVE");
  assert.equal(startResult.session?.stage, "question");
  assert.equal(startResult.session?.currentQuestionIndex, 0);

  // SECURITY: Ensure active question delivered to participants does NOT contain isCorrect or explanation
  const activeQ = startResult.session?.currentQuestion;
  assert.ok(activeQ);
  assert.equal(activeQ.explanation, undefined);
  activeQ.options.forEach((opt) => {
    assert.equal(opt.isCorrect, undefined);
  });

  // Participant 1 submits correct answer
  const rawQ0 = session.questions[0];
  const correctOpt = rawQ0.options.find((o) => o.isCorrect);
  assert.ok(correctOpt);

  const sub1 = LiveSessionManager.submitAnswer(code, p1.participantId, 0, correctOpt.id);
  assert.equal(sub1.success, true);
  assert.equal(sub1.isCorrect, true);
  assert.ok(sub1.scoreAwarded! > 100); // 100 base + speed bonus

  // Participant 2 submits incorrect answer
  const wrongOpt = rawQ0.options.find((o) => !o.isCorrect);
  assert.ok(wrongOpt);
  const sub2 = LiveSessionManager.submitAnswer(code, p2.participantId, 0, wrongOpt.id);
  assert.equal(sub2.success, true);
  assert.equal(sub2.isCorrect, false);

  // Host advances question to leaderboard
  const nextResult = LiveSessionManager.executeHostAction(code, hostSecret, "next");
  assert.equal(nextResult.success, true);
  assert.equal(nextResult.session?.stage, "leaderboard");

  // Leaderboard ranking: Participant 1 should be ranked #1
  const ranked = nextResult.session?.participants;
  assert.ok(ranked);
  assert.equal(ranked[0].id, p1.participantId);
  assert.equal(ranked[0].rank, 1);
  assert.equal(ranked[1].id, p2.participantId);
  assert.equal(ranked[1].rank, 2);

  // At leaderboard stage, answer key is revealed for educational review
  const revealedQ = nextResult.session?.currentQuestion;
  const correctRevealed = revealedQ?.options.find((o) => o.id === correctOpt.id);
  assert.equal(correctRevealed?.isCorrect, true);
});

test("Scenario E: Disconnect & refresh restores participant identity and scores", () => {
  const { session, hostSecret } = LiveSessionManager.createSession({
    title: "Olympiad Round 1",
  });
  const code = session.code;

  const join = LiveSessionManager.joinSession(code, { name: "Sophia Chen" });
  const participantId = join.participantId;

  // Start & submit answer
  LiveSessionManager.executeHostAction(code, hostSecret, "start");
  const correctOpt = session.questions[0].options.find((o) => o.isCorrect)!;
  LiveSessionManager.submitAnswer(code, participantId, 0, correctOpt.id);

  // Simulate refresh: re-fetch session with existing participantId
  const currentSession = LiveSessionManager.getSession(code)!;
  const publicState = toPublicSessionState(currentSession, participantId);

  const contender = publicState.participants.find((p) => p.id === participantId);
  assert.ok(contender);
  assert.equal(contender.name, "Sophia Chen");
  assert.ok(contender.score > 0);
  assert.equal(contender.streak, 1);
});

test("Scenario F: Host ends competition, podium crowns champion, late answers rejected", () => {
  const { session, hostSecret } = LiveSessionManager.createSession({
    title: "Championship Finals",
  });
  const code = session.code;

  const p1 = LiveSessionManager.joinSession(code, { name: "Champion A" });
  LiveSessionManager.executeHostAction(code, hostSecret, "start");

  const correctOpt = session.questions[0].options.find((o) => o.isCorrect)!;
  LiveSessionManager.submitAnswer(code, p1.participantId, 0, correctOpt.id);

  // Host ends competition
  const endResult = LiveSessionManager.executeHostAction(code, hostSecret, "end");
  assert.equal(endResult.success, true);
  assert.equal(endResult.session?.status, "ENDED");
  assert.equal(endResult.session?.stage, "winner_podium");

  // Attempting to join an ended competition is rejected
  const lateJoin = LiveSessionManager.joinSession(code, { name: "Late Comer" });
  assert.equal(lateJoin.success, false);
  assert.match(lateJoin.error!, /SESSION_ENDED/);

  // Attempting to submit answer to an ended competition is rejected
  const lateSub = LiveSessionManager.submitAnswer(code, p1.participantId, 0, correctOpt.id);
  assert.equal(lateSub.success, false);
  assert.match(lateSub.error!, /STAGE_NOT_ACTIVE/);
});

test("Security & Boundary: Unauthorized host action and duplicate submission rejected", () => {
  const { session } = LiveSessionManager.createSession({
    title: "Security Verification Session",
  });
  const code = session.code;

  // Attacker tries to start session without host secret
  const unauthResult = LiveSessionManager.executeHostAction(code, "fake_token_123", "start");
  assert.equal(unauthResult.success, false);
  assert.match(unauthResult.error!, /UNAUTHORIZED_HOST/);

  // Invalid room code rejected cleanly
  const invalidJoin = LiveSessionManager.joinSession("QD-FAKE", { name: "Hacker" });
  assert.equal(invalidJoin.success, false);
  assert.match(invalidJoin.error!, /INVALID_CODE/);
});

test("QR Code Generation: Canonical HTTPS join URL is valid and scannable", async () => {
  const code = "QD-8492";
  const canonicalUrl = getCanonicalJoinUrl(code);

  assert.equal(canonicalUrl.startsWith("https://"), true);
  assert.equal(canonicalUrl.includes("localhost"), false);
  assert.equal(canonicalUrl.includes("127.0.0.1"), false);
  assert.equal(canonicalUrl.includes("code=QD-8492"), true);
  assert.ok(canonicalUrl.includes("quizclassroom.vercel.app"));

  // Generate real QR code data URL
  const qrDataUri = await QRCode.toDataURL(canonicalUrl, {
    width: 300,
    margin: 2,
    errorCorrectionLevel: "M",
  });

  assert.ok(qrDataUri.startsWith("data:image/png;base64,"));
  assert.ok(qrDataUri.length > 500);
});

test("Scenario G: 1-Click Direct Next Question Progression and Leaderboard Reveal", () => {
  const { session, hostSecret } = LiveSessionManager.createSession({
    title: "1-Click Host Progression Test",
  });
  const code = session.code;

  // 1. Host starts competition
  const startRes = LiveSessionManager.executeHostAction(code, hostSecret, "start");
  assert.equal(startRes.success, true);
  assert.equal(startRes.session?.stage, "question");
  assert.equal(startRes.session?.currentQuestionIndex, 0);

  // 2. Direct Next Question action advances immediately to question index 1 in 1 click
  const directNextRes = LiveSessionManager.executeHostAction(code, hostSecret, "next_question");
  assert.equal(directNextRes.success, true);
  assert.equal(directNextRes.session?.stage, "question");
  assert.equal(directNextRes.session?.currentQuestionIndex, 1);
  assert.ok(directNextRes.session?.currentQuestion);

  // 3. Reveal Leaderboard action pauses and shows leaderboard
  const revealRes = LiveSessionManager.executeHostAction(code, hostSecret, "reveal_leaderboard");
  assert.equal(revealRes.success, true);
  assert.equal(revealRes.session?.stage, "leaderboard");
});

test("Scenario H: Real-time Live Responses Histogram & Connected Systems Telemetry", () => {
  const { session, hostSecret } = LiveSessionManager.createSession({
    title: "Telemetry Live Response Test",
  });
  const code = session.code;

  // Enroll 3 participants
  const p1 = LiveSessionManager.joinSession(code, { name: "Contender Alpha" });
  const p2 = LiveSessionManager.joinSession(code, { name: "Contender Beta" });
  const p3 = LiveSessionManager.joinSession(code, { name: "Contender Gamma" });

  LiveSessionManager.executeHostAction(code, hostSecret, "start");
  const q0 = session.questions[0];

  // Contender Alpha and Beta vote for Option 0, Gamma votes for Option 1
  LiveSessionManager.submitAnswer(code, p1.participantId, 0, q0.options[0].id);
  LiveSessionManager.submitAnswer(code, p2.participantId, 0, q0.options[0].id);
  LiveSessionManager.submitAnswer(code, p3.participantId, 0, q0.options[1].id);

  const publicState = toPublicSessionState(LiveSessionManager.getSession(code)!);

  // Assert submissions count and real-time histogram distribution
  assert.equal(publicState.submissionsCountForCurrentQ, 3);
  assert.equal(publicState.submissionDistribution[q0.options[0].id], 2);
  assert.equal(publicState.submissionDistribution[q0.options[1].id], 1);
  assert.equal(publicState.submittedParticipantIds.length, 3);
  assert.ok(publicState.connectedSystemsCount >= 3);
});

test("Scenario I: Database 1,000 Questions Multi-Topic Tag Cross-Indexing", async () => {
  const { ALL_DEFAULT_QUESTIONS } = await import("../lib/data/question-bank");
  const { doesQuestionMatchTopic } = await import("../lib/data/taxonomy");

  // Verify starter question bank has exactly 1,000+ items
  assert.ok(ALL_DEFAULT_QUESTIONS.length >= 1000);

  // Find a question with tags ["calculus", "derivatives"]
  const calculusQ = ALL_DEFAULT_QUESTIONS.find((q) =>
    q.tags?.some((t) => t.includes("calculus") || t.includes("derivative"))
  );
  assert.ok(calculusQ);

  // Assert it matches both "Calculus & Analysis" and its primary topic
  assert.equal(doesQuestionMatchTopic(calculusQ, "Calculus & Analysis"), true);
  assert.equal(doesQuestionMatchTopic(calculusQ, calculusQ.topic), true);

  // Find an AI / Machine Learning question
  const aiQ = ALL_DEFAULT_QUESTIONS.find((q) =>
    q.tags?.some((t) => t.includes("ai") || t.includes("machine-learning"))
  );
  assert.ok(aiQ);
  assert.equal(doesQuestionMatchTopic(aiQ, "Artificial Intelligence & Machine Learning"), true);
});
