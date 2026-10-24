import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

type ArrowLinkProps = ComponentProps<typeof Link> & { label: string };

/** Editorial text link with a hairline underline and a quiet arrow. */
export function ArrowLink({ label, className = "", ...props }: ArrowLinkProps) {
  return (
    <Link {...props} className={`link-line eyebrow group ${className}`}>
      <span>{label}</span>
      <ArrowRight
        size={14}
        strokeWidth={1.25}
        aria-hidden
        className="transition-transform duration-700 ease-silk group-hover:translate-x-1"
      />
    </Link>
  );
}
