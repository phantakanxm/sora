import { quizQuestions, TIE_BREAK_QUESTION, type QuizOption } from "@/data/quiz";
import type { FragranceSlug } from "@/types/product";

export type Answers = Record<string, string>;

export interface QuizResult {
  winner: FragranceSlug;
  scores: Record<FragranceSlug, number>;
  maxScore: number;
  reasons: string[];
  tieBroken: boolean;
}

const ORDER: readonly FragranceSlug[] = ["dusk", "dawn", "ember"];

function selectedOption(questionId: string, answers: Answers): QuizOption | undefined {
  const question = quizQuestions.find((q) => q.id === questionId);
  return question?.options.find((o) => o.id === answers[questionId]);
}

/**
 * Deterministic scoring: every answer adds fixed points to one or more fragrances.
 * Highest total wins. A tie is settled by the "material" answer, then by collection order.
 */
export function scoreQuiz(answers: Answers): QuizResult {
  const scores: Record<FragranceSlug, number> = { dusk: 0, dawn: 0, ember: 0 };
  let maxScore = 0;

  for (const question of quizQuestions) {
    maxScore += Math.max(
      ...question.options.map((o) => Math.max(0, ...Object.values(o.weights).map((w) => w ?? 0))),
    );
    const option = selectedOption(question.id, answers);
    if (!option) continue;
    for (const slug of ORDER) scores[slug] += option.weights[slug] ?? 0;
  }

  const top = Math.max(...ORDER.map((s) => scores[s]));
  const leaders = ORDER.filter((s) => scores[s] === top);

  let winner = leaders[0];
  let tieBroken = false;
  if (leaders.length > 1) {
    tieBroken = true;
    const decider = selectedOption(TIE_BREAK_QUESTION, answers);
    const favoured = leaders.find((s) => (decider?.weights[s] ?? 0) > 0);
    if (favoured) winner = favoured;
  }

  const reasons = quizQuestions
    .map((q) => selectedOption(q.id, answers))
    .filter((o): o is QuizOption => Boolean(o && (o.weights[winner] ?? 0) > 0))
    .sort((a, b) => (b.weights[winner] ?? 0) - (a.weights[winner] ?? 0))
    .map((o) => o.reason);

  return { winner, scores, maxScore, reasons, tieBroken };
}
