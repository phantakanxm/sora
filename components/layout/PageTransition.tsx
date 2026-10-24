import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps a page so route changes cross-fade through a brief dark veil.
 * Lives in each page (not the layout) so enter/exit fire on navigation.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="sora-page" exit="sora-page" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
