import { useEffect, useId, useRef, useState } from "react";

type FloatingSelectPosition = {
  top: number;
  left: number;
  width: number;
};

type UseFloatingSelectOptions = {
  getPosition?: (rect: DOMRect) => FloatingSelectPosition;
  portalId?: string;
};

const DEFAULT_PORTAL_ID = "floating-select-portal-container";

const getDefaultPosition = (rect: DOMRect): FloatingSelectPosition => ({
  top: rect.bottom + window.scrollY + 8,
  left: rect.left + window.scrollX,
  width: rect.width,
});

export const useFloatingSelect = ({
  getPosition = getDefaultPosition,
  portalId = DEFAULT_PORTAL_ID,
}: UseFloatingSelectOptions = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<FloatingSelectPosition>({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (!document.getElementById(portalId)) {
      const portalContainer = document.createElement("div");
      portalContainer.id = portalId;
      document.body.appendChild(portalContainer);
    }

    return () => {
      const portalContainer = document.getElementById(portalId);
      if (portalContainer && portalContainer.childNodes.length === 0) {
        document.body.removeChild(portalContainer);
      }
    };
  }, [portalId]);

  useEffect(() => {
    if (!isOpen || !triggerRef.current) {
      return;
    }

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      setPosition(getPosition(rect));
    };

    updatePosition();

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [getPosition, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (
        triggerRef.current?.contains(event.target)
        || optionsRef.current?.contains(event.target)
      ) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return {
    isOpen,
    listboxId,
    optionsRef,
    portalNode: document.getElementById(portalId) || document.body,
    position,
    setIsOpen,
    triggerRef,
  };
};
