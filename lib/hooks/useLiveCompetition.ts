"use client";

import { CompetitionItem } from "@/lib/types/competition";
import { QuestionItem } from "@/lib/types/question";
import { useLiveArena } from "./useLiveArena";

export function useLiveCompetition(competition?: Partial<CompetitionItem>, questions?: QuestionItem[]) {
  void questions;
  const code = competition?.code || "QD-8492";

  const arena = useLiveArena({
    code,
    isHost: true,
  });

  return {
    ...arena,
    setStage: () => {},
  };
}
