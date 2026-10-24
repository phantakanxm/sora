"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.email("Please enter a valid email address."),
});

type Values = z.infer<typeof schema>;

export function NewsletterForm() {
  const [joined, setJoined] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    reset();
    setJoined(true);
  };

  if (joined) {
    return (
      <div role="status" className="space-y-2">
        <p className="display text-[1.75rem] leading-tight">Thank you. Until the next quiet moment.</p>
        <p className="text-ui text-sand/70">Demo only: your address was not stored or sent anywhere.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-md">
      <label htmlFor="newsletter-email" className="eyebrow text-sand/80">
        Letters from SORA
      </label>
      <div className="mt-3 flex items-end gap-3 border-b border-line-dark focus-within:border-sand">
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "newsletter-error" : "newsletter-hint"}
          className="w-full bg-transparent py-3 text-ivory placeholder:text-sand/65 focus:outline-none"
          {...register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="eyebrow flex min-h-11 shrink-0 items-center gap-2 transition-opacity hover:opacity-60 disabled:opacity-40"
        >
          {isSubmitting ? "Joining" : "Join"}
          <ArrowRight size={14} strokeWidth={1.25} aria-hidden />
        </button>
      </div>
      {errors.email ? (
        <p id="newsletter-error" role="alert" className="mt-3 text-ui text-[#e0a58f]">
          {errors.email.message}
        </p>
      ) : (
        <p id="newsletter-hint" className="mt-3 text-ui text-sand/75">
          Occasional notes on scent and memory. Demo form, nothing is sent.
        </p>
      )}
    </form>
  );
}
