import { RefObject, useLayoutEffect, useState } from 'react';

export type FloatingMenuPlacement = 'top' | 'bottom';

interface UseFloatingMenuPlacementOptions {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  floatingRef: RefObject<HTMLElement>;
  gap?: number;
}

export function useFloatingMenuPlacement({
  isOpen,
  anchorEl,
  floatingRef,
  gap = 8,
}: UseFloatingMenuPlacementOptions): FloatingMenuPlacement {
  const [placement, setPlacement] = useState<FloatingMenuPlacement>('bottom');

  useLayoutEffect(() => {
    if (!isOpen || !anchorEl) {
      return;
    }

    const updatePlacement = () => {
      const floatingEl = floatingRef.current;

      if (!floatingEl) {
        return;
      }

      const anchorRect = anchorEl.getBoundingClientRect();
      const floatingHeight = floatingEl.offsetHeight;
      const spaceBelow = window.innerHeight - anchorRect.bottom - gap;
      const spaceAbove = anchorRect.top - gap;

      setPlacement(
        floatingHeight > spaceBelow && spaceAbove >= floatingHeight
          ? 'top'
          : 'bottom'
      );
    };

    updatePlacement();
    window.addEventListener('scroll', updatePlacement, true);
    window.addEventListener('resize', updatePlacement);

    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(updatePlacement);

    if (floatingRef.current) {
      resizeObserver?.observe(floatingRef.current);
    }

    return () => {
      window.removeEventListener('scroll', updatePlacement, true);
      window.removeEventListener('resize', updatePlacement);
      resizeObserver?.disconnect();
    };
  }, [anchorEl, floatingRef, gap, isOpen]);

  return placement;
}
