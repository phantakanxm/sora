import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: (describedBy: string | undefined) => ReactNode;
};

/** Label, control and error message wired together for assistive technology. */
export function FormField({ id, label, error, hint, optional, className = "", children }: FormFieldProps) {
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow text-ink-soft">
        {label}
        {optional && <span className="ml-2 normal-case tracking-normal opacity-70">(optional)</span>}
      </label>
      {children(describedBy)}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-ui text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-ui text-[#8c3b2a]">
          {error}
        </p>
      )}
    </div>
  );
}
