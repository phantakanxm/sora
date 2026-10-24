"use client";

import { ArrowRight } from "lucide-react";
import type { RefObject } from "react";
import type { QuizQuestion as Question } from "@/data/quiz";

type QuizQuestionProps = {
  question: Question;
  value: string | undefined;
  onChange: (optionId: string) => void;
  onSubmit: () => void;
  isLast: boolean;
  headingRef: RefObject<HTMLHeadingElement | null>;
};

export function QuizQuestion({ question, value, onChange, onSubmit, isLast, headingRef }: QuizQuestionProps) {
  return (
    <form
      className="mt-14"
      onSubmit={(event) => {
        event.preventDefault();
        if (value) onSubmit();
      }}
    >
      <fieldset>
        <legend className="block w-full">
          <span data-step-item className="eyebrow block text-ink-soft">
            {question.topic}
          </span>
          <h1
            ref={headingRef}
            tabIndex={-1}
            data-step-item
            className="display mt-6 block text-h2 text-balance outline-none"
          >
            {question.prompt}
          </h1>
        </legend>

        <div className="mt-12 border-t border-line">
          {question.options.map((option, i) => {
            const checked = value === option.id;
            return (
              <label
                key={option.id}
                data-step-item
                className={`group flex cursor-pointer items-center gap-6 border-b border-line py-6 transition-colors duration-500 has-[:focus-visible]:bg-sand/25 ${
                  checked ? "text-espresso" : "text-espresso/70 hover:text-espresso"
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.id}
                  checked={checked}
                  onChange={() => onChange(option.id)}
                  className="sr-only"
                />
                <span className="eyebrow w-6 shrink-0 tabular-nums text-ink-soft">{String.fromCharCode(65 + i)}</span>
                <span className="flex-1">
                  <span className="display block text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] leading-tight">
                    {option.label}
                  </span>
                  <span className="mt-1 block text-ui text-ink-soft">{option.hint}</span>
                </span>
                <span
                  aria-hidden
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                    checked ? "border-espresso" : "border-line group-hover:border-espresso/40"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full bg-espresso transition-transform duration-500 ease-silk ${
                      checked ? "scale-100" : "scale-0"
                    }`}
                  />
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div data-step-item className="mt-10 flex flex-wrap items-center gap-6">
        <button type="submit" className="btn btn-solid" disabled={!value}>
          {isLast ? "Reveal my scent" : "Continue"} <ArrowRight size={14} strokeWidth={1.25} aria-hidden />
        </button>
        {!value && <p className="text-ui text-ink-soft">Choose one answer to continue.</p>}
      </div>
    </form>
  );
}
