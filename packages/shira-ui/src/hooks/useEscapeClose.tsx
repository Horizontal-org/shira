import { useEffect } from "react";

type UseEscapeCloseOptions = {
  when: boolean;
  onClose: () => void;
  target?: Document | HTMLElement | Window | null;
  stopPropagation?: boolean;
};

export function useEscapeClose({
  when,
  onClose,
  target,
  stopPropagation = true,
}: UseEscapeCloseOptions) {
  useEffect(() => {
    if (!when) return;

    const t = target ?? (typeof document !== "undefined" ? document : null);
    if (!t) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        if (stopPropagation) e.stopPropagation();
        onClose();
      }
    };

    t.addEventListener("keydown", onKeyDown);
    return () => t.removeEventListener("keydown", onKeyDown);
  }, [when, onClose, target, stopPropagation]);
}
