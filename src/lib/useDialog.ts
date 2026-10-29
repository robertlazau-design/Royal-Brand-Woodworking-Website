import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

// Keyboard behaviour for pop-ups (phone menu, photo viewer, privacy window):
// focus moves inside when it opens, Tab stays inside, Escape closes,
// and focus goes back to whatever opened it.
export function useDialog(open: boolean, ref: RefObject<HTMLElement | null>, onClose: () => void) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    // Only what's actually on screen (skips the desktop-only links on phones and vice versa).
    const focusables = () =>
      Array.from<HTMLElement>(ref.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(el => el.getClientRects().length > 0);

    const preferred = ref.current?.querySelector<HTMLElement>('[data-autofocus]');
    (preferred ?? focusables()[0] ?? ref.current)?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active || !ref.current?.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, [open, ref]);
}
