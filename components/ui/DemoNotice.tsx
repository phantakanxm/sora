type DemoNoticeProps = { children: React.ReactNode; className?: string };

/** Consistent disclosure that SORA is a fictional, portfolio-only storefront. */
export function DemoNotice({ children, className = "" }: DemoNoticeProps) {
  return (
    <p className={`flex gap-3 text-ui leading-relaxed ${className}`}>
      <span aria-hidden className="mt-[0.55em] h-px w-4 shrink-0 bg-current opacity-60" />
      <span>{children}</span>
    </p>
  );
}
