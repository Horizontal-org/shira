import { useEffect } from "react";

type Options = {
  when: boolean;
  onEnter: () => void;
  target?: Window | Document | HTMLElement | null;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  ignoreWhenTextarea?: boolean;
  ignoreWithModifier?: boolean;
};

export function useEnterSubmit({
  when,
  onEnter,
  target,
  preventDefault = true,
  stopPropagation = false,
  ignoreWhenTextarea = true,
  ignoreWithModifier = true,
}: Options) {
  useEffect(() => {
    if (!when) return;

    const t =
      target ??
      (typeof window !== "undefined"
        ? window
        : typeof document !== "undefined"
          ? document
          : null);

    if (!t) return;

    const handler = (e: KeyboardEvent) => {
      if (e.isComposing) return;
      if (ignoreWithModifier && (e.altKey || e.ctrlKey || e.metaKey)) return;
      if (e.repeat) return;

      const keyIsEnter =
        e.key === "Enter" || e.code === "Enter" || e.key === "NumpadEnter";

      if (!keyIsEnter) return;

      const active = (document && document.activeElement) as HTMLElement | null;
      if (
        ignoreWhenTextarea &&
        active &&
        active.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (preventDefault) e.preventDefault();
      if (stopPropagation) e.stopPropagation();
      onEnter();
    };

    t.addEventListener("keydown", handler);
    return () => t.removeEventListener("keydown", handler);
  }, [
    when,
    onEnter,
    target,
    preventDefault,
    stopPropagation,
    ignoreWhenTextarea,
    ignoreWithModifier,
  ]);
}
