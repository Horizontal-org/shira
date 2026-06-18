import { LibraryFilterToggleButton } from "@horizontal-org/shira-ui";
import { FunctionComponent } from "react";

type Props = {
  text: string;
  isOpen: boolean;
  onClick: () => void;
};

export const LibraryFilterToggle: FunctionComponent<Props> = ({
  text,
  isOpen,
  onClick,
}) => {
  return (
    <LibraryFilterToggleButton
      text={text}
      isOpen={isOpen}
      onClick={onClick}
    />
  );
};
