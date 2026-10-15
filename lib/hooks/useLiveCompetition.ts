"use client";

import { useLiveArena } from "./useLiveArena";
import { CompetitionItem } from "@/lib/types/competition";
import { QuestionItem } from "@/lib/types/question";

export function useLiveCompetition(competition?: Partial<CompetitionItem>, questions?: QuestionItem[]) {
  const code = competition?.code || "QD-8492";

  const arena = useLiveArena({
    code,
    isHost: true,
  });

  return {
    ...arena,
    setStage: (stage: any) => {},
  };
}
