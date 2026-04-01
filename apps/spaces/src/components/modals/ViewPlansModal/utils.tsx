import { FunctionComponent, useState } from "react";
import { GeneralTooltip, useTheme } from "@shira/ui";
import { IoMdHelpCircle } from "react-icons/io";

interface HelpTooltipIconProps {
  label: string;
}

export const HelpTooltipIcon: FunctionComponent<HelpTooltipIconProps> = ({ label }) => {
  const theme = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <GeneralTooltip
      enabled={true}
      show={showTooltip}
      setShow={setShowTooltip}
      label={label}
    >
      <IoMdHelpCircle size={20} color={theme.colors.dark.mediumGrey} />
    </GeneralTooltip>
  );
};
