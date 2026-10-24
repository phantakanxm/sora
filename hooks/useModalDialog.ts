"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { lockScroll, unlockScroll } from "@/lib/scroll";

const CLOSE_MS = 520;

/**
 * Drives a native <dialog> with enter/exit transitions, scroll locking,
 * Escape and backdrop-click handling, and focus restoration.
 */
export function useModalDialog(open: boolean, onClose: () => void) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const lockedRef = useRef(false);
  const [visible, setVisible] = useState(false);

  const release = useCallback(() => {
    if (!lockedRef.current) return;
    lockedRef.current = false;
    unlockScroll();
    const target = returnFocusRef.current;
    returnFocusRef.current = null;
    if (target?.isConnected) target.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
      // showModal() focuses the first focusable node; prefer an explicit target when one is marked.
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
      lockedRef.current = true;
      lockScroll();
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    if (!open && dialog.open) {
      setVisible(false);
      const timer = window.setTimeout(() => {
        dialog.close();
        release();
      }, CLOSE_MS);
      return () => window.clearTimeout(timer);
    }
  }, [open, release]);

  // Release the lock if the component unmounts (or is hidden by <Activity>) while open.
  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      if (dialog?.open) dialog.close();
      release();
    };
  }, [release]);

  const onCancel = useCallback(
    (event: React.SyntheticEvent<HTMLDialogElement>) => {
      event.preventDefault();
      onClose();
    },
    [onClose],
  );

  /** Fires if the browser closes the dialog itself (e.g. repeated Escape). */
  const onNativeClose = useCallback(() => {
    setVisible(false);
    release();
    onClose();
  }, [onClose, release]);

  const onBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (event.target === event.currentTarget) onClose();
    },
    [onClose],
  );

  return { dialogRef, visible, onCancel, onNativeClose, onBackdropClick };
}
