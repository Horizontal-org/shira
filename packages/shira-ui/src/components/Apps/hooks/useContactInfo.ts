import { useEffect, useState } from "react";

const useContactInfo = (showExplanations?: boolean) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((previous) => !previous);

  useEffect(() => {
    if (showExplanations) {
      setIsOpen(false);
    }
  }, [showExplanations]);

  return { isOpen: isOpen && !showExplanations, open, close, toggle };
};

export default useContactInfo;
