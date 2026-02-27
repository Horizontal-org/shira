import { useCallback } from "react";
import type { KeyboardEvent } from "react";

type Options = {
  onToggle: () => void;
  onClose?: () => void;
  openKeys?: string[];
  closeKeys?: string[];
};

export function useToggleKeydown<T extends HTMLElement>({
  onToggle,
  onClose,
  openKeys = ["Enter", " "],
  closeKeys = ["Escape"],
}: Options) {
  return useCallback(
    (event: KeyboardEvent<T>) => {
      if (openKeys.includes(event.key)) {
        event.preventDefault();
        onToggle();
        return;
      }
      if (onClose && closeKeys.includes(event.key)) {
        event.preventDefault();
        onClose();
      }
    },
    [onToggle, onClose, openKeys, closeKeys]
  );
}
