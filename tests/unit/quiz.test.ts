import { describe, expect, it } from "vitest";
import { quizQuestions } from "@/data/quiz";
import { scoreQuiz, type Answers } from "@/lib/quiz";
import type { FragranceSlug } from "@/types/product";

/** Picks, for every question, the option that gives the most points to one fragrance. */
function loyalTo(slug: FragranceSlug): Answers {
  return Object.fromEntries(
    quizQuestions.map((q) => {
      const best = [...q.options].sort((a, b) => (b.weights[slug] ?? 0) - (a.weights[slug] ?? 0))[0];
      return [q.id, best.id];
    }),
  );
}

describe("scoreQuiz", () => {
  it.each<FragranceSlug>(["dusk", "dawn", "ember"])("lets %s win when every answer leans towards it", (slug) => {
    const result = scoreQuiz(loyalTo(slug));
    expect(result.winner).toBe(slug);
    expect(result.tieBroken).toBe(false);
  });

  it("adds fixed points per answer", () => {
    const result = scoreQuiz({
      mood: "clear",
      atmosphere: "library",
      intensity: "passing",
      material: "woods",
      time: "evening",
    });
    expect(result.scores).toEqual({ dusk: 9, dawn: 3, ember: 2 });
    expect(result.winner).toBe("dusk");
  });

  it("settles a tie with the material answer", () => {
    const result = scoreQuiz({
      mood: "inward",
      atmosphere: "sunroom",
      intensity: "close",
      material: "woods",
      time: "morning",
    });
    expect(result.scores.dusk).toBe(result.scores.dawn);
    expect(result.tieBroken).toBe(true);
    expect(result.winner).toBe("dusk");
  });

  it("explains the result with answers that pointed to the winner, strongest first", () => {
    const result = scoreQuiz(loyalTo("ember"));
    expect(result.reasons[0]).toMatch(/warmth|stays|saffron/);
    expect(result.reasons.every((r) => r.length > 0)).toBe(true);
  });

  it("is deterministic and falls back to collection order with no answers", () => {
    const first = scoreQuiz({});
    expect(first).toEqual(scoreQuiz({}));
    expect(first.winner).toBe("dusk");
    expect(first.reasons).toEqual([]);
  });

  it("reports the maximum available points", () => {
    expect(scoreQuiz({}).maxScore).toBe(14);
  });
});
