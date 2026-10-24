"use client";

import { Minus, Plus } from "lucide-react";
import { MAX_QUANTITY, MIN_QUANTITY } from "@/types/cart";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  /** Accessible name, e.g. "Quantity of DUSK 50 ml" */
  label: string;
  size?: "sm" | "md";
};

export function QuantityStepper({ value, onChange, label, size = "md" }: QuantityStepperProps) {
  const box = size === "sm" ? "h-9 w-9" : "h-[3.25rem] w-12";
  return (
    <div role="group" aria-label={label} className="inline-flex items-center border border-line">
      <button
        type="button"
        className={`${box} grid place-items-center transition-opacity hover:opacity-60 disabled:opacity-25`}
        onClick={() => onChange(value - 1)}
        disabled={value <= MIN_QUANTITY}
        aria-label="Decrease quantity"
      >
        <Minus size={14} strokeWidth={1.25} aria-hidden />
      </button>
      <output aria-live="polite" className={`${size === "sm" ? "w-8 text-ui" : "w-10"} text-center tabular-nums`}>
        {value}
      </output>
      <button
        type="button"
        className={`${box} grid place-items-center transition-opacity hover:opacity-60 disabled:opacity-25`}
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QUANTITY}
        aria-label="Increase quantity"
      >
        <Plus size={14} strokeWidth={1.25} aria-hidden />
      </button>
    </div>
  );
}
