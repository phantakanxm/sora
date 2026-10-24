"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { Picture } from "@/components/ui/Picture";
import { ingredients } from "@/data/ingredients";
import { fragrances } from "@/data/products";
import { quizQuestions } from "@/data/quiz";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { scoreQuiz, type Answers } from "@/lib/quiz";
import type { FragranceSlug } from "@/types/product";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResult } from "./QuizResult";

const INTRO = -1;
const total = quizQuestions.length;

function leadingSlug(weights: Partial<Record<FragranceSlug, number>>): FragranceSlug | undefined {
  return (Object.entries(weights) as [FragranceSlug, number][]).sort((a, b) => b[1] - a[1])[0]?.[0];
}

export function ScentQuiz() {
  const [step, setStep] = useState(INTRO);
  const [answers, setAnswers] = useState<Answers>({});
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  const isResult = step >= total;
  const question = step >= 0 && step < total ? quizQuestions[step] : undefined;
  const result = useMemo(() => (isResult ? scoreQuiz(answers) : undefined), [isResult, answers]);

  // The visual panel follows the material behind the current choice.
  const visual = useMemo(() => {
    if (result) return null;
    const option = question?.options.find((o) => o.id === answers[question.id]);
    const slug = option && leadingSlug(option.weights);
    // Until an answer leans somewhere, show the whole collection.
    return ingredients.find((i) => i.fragrance === slug)?.image.src ?? "trio";
  }, [answers, question, result]);

  useGSAP(
    () => {
      if (moved.current) headingRef.current?.focus({ preventScroll: true });
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-step-item]",
          // Opacity only: visibility:hidden would steal focus from the step heading.
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.07 },
        );
      });
      return () => mm.revert();
    },
    { scope: stageRef, dependencies: [step] },
  );

  const go = (next: number) => {
    moved.current = true;
    setStep(next);
    const top = stageRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) window.scrollTo({ top: window.scrollY + top - 120 });
  };

  const restart = () => {
    setAnswers({});
    go(INTRO);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      {!isResult && visual && (
        <div className="relative hidden lg:col-span-5 lg:block">
          <div aria-hidden className="sticky top-[calc(var(--spacing-header)+2rem)] aspect-[4/5] overflow-hidden bg-sand/40">
            <div
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-silk ${
                visual === "trio" ? "opacity-100" : "opacity-0"
              }`}
            >
              {fragrances.map((f, i) => (
                <div
                  key={f.slug}
                  className="absolute bottom-[12%] aspect-[3/4] w-[46%]"
                  style={{ left: `${4 + i * 25}%`, zIndex: i === 1 ? 2 : 1, transform: i === 1 ? "translateY(-6%)" : undefined }}
                >
                  <Picture image={f.images.cutout} fill alt="" sizes="20vw" className="object-contain drop-shadow-[0_30px_40px_rgb(21_19_17/0.18)]" />
                </div>
              ))}
            </div>
            {ingredients.map(({ image }) => (
              <div
                key={image.src}
                className={`absolute inset-0 transition-opacity duration-[1400ms] ease-silk ${
                  image.src === visual ? "opacity-100" : "opacity-0"
                }`}
              >
                <Picture image={image} fill focus alt="" sizes="40vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        ref={stageRef}
        className={isResult ? "lg:col-span-12" : "lg:col-span-6 lg:col-start-7 lg:min-h-[70svh]"}
      >
        {step === INTRO && (
          <div>
            <p data-step-item className="eyebrow text-ink-soft">
              A consultation in {total} questions
            </p>
            <h1
              ref={headingRef}
              tabIndex={-1}
              data-step-item
              className="display mt-8 text-h1 text-balance outline-none"
            >
              Find the scent that feels like you.
            </h1>
            <p data-step-item className="mt-8 max-w-md text-lead">
              Answer by instinct. There are no wrong choices, only the moods you return to.
            </p>
            <div data-step-item className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <button type="button" className="btn btn-solid" onClick={() => go(0)}>
                Begin <ArrowRight size={14} strokeWidth={1.25} aria-hidden />
              </button>
              <p className="max-w-xs text-ui text-ink-soft">
                A simple, rule-based guide. Nothing is stored or sent.
              </p>
            </div>
          </div>
        )}

        {question && (
          <div>
            <div data-step-item className="flex items-center justify-between gap-6">
              <button
                type="button"
                onClick={() => go(step - 1)}
                className="eyebrow flex min-h-11 items-center gap-2 transition-opacity hover:opacity-60"
              >
                <ArrowLeft size={14} strokeWidth={1.25} aria-hidden /> Back
              </button>
              <p className="eyebrow tabular-nums text-ink-soft" aria-hidden>
                {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
            </div>
            <div
              data-step-item
              role="progressbar"
              aria-label="Consultation progress"
              aria-valuemin={1}
              aria-valuemax={total}
              aria-valuenow={step + 1}
              aria-valuetext={`Question ${step + 1} of ${total}`}
              className="mt-4 h-px w-full bg-line"
            >
              <div
                className="h-px origin-left bg-espresso transition-transform duration-1000 ease-silk"
                style={{ transform: `scaleX(${(step + 1) / total})` }}
              />
            </div>

            <QuizQuestion
              key={question.id}
              question={question}
              headingRef={headingRef}
              value={answers[question.id]}
              onChange={(optionId) => setAnswers((prev) => ({ ...prev, [question.id]: optionId }))}
              onSubmit={() => go(step + 1)}
              isLast={step === total - 1}
            />
          </div>
        )}

        {result && <QuizResult result={result} headingRef={headingRef} onRestart={restart} />}
      </div>
    </div>
  );
}
