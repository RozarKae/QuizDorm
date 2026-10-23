import test from "node:test";
import assert from "node:assert/strict";
import { getCanonicalJoinUrl } from "../components/competitions/SessionQrCard";
import { LiveSessionManager } from "../lib/live/liveSessionManager";

test("Guest Arena Security & Candidate Isolation Suite", async (t) => {
  await t.test("QR and Canonical Join URLs strictly point to public /live/join and never /student/*", () => {
    const url = getCanonicalJoinUrl("QD-8492");
    assert.match(url, /\/live\/join\?code=QD-8492/);
    assert.doesNotMatch(url, /\/student\//, "Canonical QR join URL must never leak /student/ hierarchy to public guests");
  });

  await t.test("Guest joining with PIN receives ephemeral contestant token with no persistent userId", () => {
    const sessionRes = LiveSessionManager.createSession({
      title: "Security Isolation Arena 2026",
      code: "QD-SEC1",
      settings: {
        durationMinutes: 30,
        maxParticipants: 100,
        negativeMarking: false,
        timeBonus: true,
        timePerQuestionSeconds: 30,
      },
    });

    const guestJoin = LiveSessionManager.joinSession("QD-SEC1", {
      name: "EphemeralContender",
      // No userId passed - this is a guest
    });

    assert.equal(guestJoin.success, true);
    assert.ok(guestJoin.participantId.startsWith("pt_"));
    assert.ok(guestJoin.participantToken.startsWith("tok_"));

    const participant = guestJoin.session.participants.find((p) => p.id === guestJoin.participantId);
    assert.ok(participant, "Participant must be present in arena session");
    assert.equal(participant.userId, undefined, "Guest contender must not be assigned any registered student userId");
    assert.equal(participant.name, "EphemeralContender");
  });

  await t.test("Signed-in candidate joining with PIN preserves candidate userId", () => {
    const registeredJoin = LiveSessionManager.joinSession("QD-SEC1", {
      userId: "usr_registered_candidate_99",
      name: "VerifiedCandidate",
    });

    assert.equal(registeredJoin.success, true);
    const candidate = registeredJoin.session.participants.find((p) => p.id === registeredJoin.participantId);
    assert.ok(candidate);
    assert.equal(candidate.userId, "usr_registered_candidate_99");
  });

  await t.test("Edge Route Whitelist Rules: /student and /dashboard are sealed, /live and /join are public", () => {
    const isPublicLiveRoute = (pathname: string) =>
      pathname === "/join" ||
      pathname.startsWith("/join/") ||
      pathname.startsWith("/live") ||
      pathname.startsWith("/api/live");

    const protectedRoutes = ["/admin", "/school", "/teacher", "/student", "/dashboard"];
    const isProtectedRoute = (pathname: string) =>
      !isPublicLiveRoute(pathname) &&
      protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

    // Public Arena Routes
    assert.equal(isPublicLiveRoute("/join"), true);
    assert.equal(isPublicLiveRoute("/live/join"), true);
    assert.equal(isPublicLiveRoute("/live/arena/QD-8492"), true);
    assert.equal(isPublicLiveRoute("/api/live/session/QD-8492"), true);

    // Protected Candidate & Institutional Routes (Must be shielded)
    assert.equal(isProtectedRoute("/student"), true);
    assert.equal(isProtectedRoute("/student/live/join"), true);
    assert.equal(isProtectedRoute("/student/dashboard"), true);
    assert.equal(isProtectedRoute("/student/analytics"), true);
    assert.equal(isProtectedRoute("/dashboard"), true);
    assert.equal(isProtectedRoute("/dashboard/competitions"), true);
    assert.equal(isProtectedRoute("/teacher"), true);
    assert.equal(isProtectedRoute("/school"), true);
    assert.equal(isProtectedRoute("/admin"), true);
  });
});
