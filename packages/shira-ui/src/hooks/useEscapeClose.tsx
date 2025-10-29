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
    if (!when || !target) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        if (stopPropagation) e.stopPropagation();
        onClose();
      }
    };

    target.addEventListener("keydown", onKeyDown);
    return () => target.removeEventListener("keydown", onKeyDown);
  }, [when, onClose, target, stopPropagation]);
}
