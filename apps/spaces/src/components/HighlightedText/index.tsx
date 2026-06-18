import { FunctionComponent } from "react";
import { styled } from "@horizontal-org/shira-ui";

type Props = {
  text: string;
  highlight?: string;
};

export const HighlightedText: FunctionComponent<Props> = ({
  text,
  highlight,
}) => {
  const normalizedHighlight = highlight?.trim();

  if (!normalizedHighlight) {
    return <>{text}</>;
  }

  const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(${escapeRegExp(normalizedHighlight)})`, "ig"); // (i = case-insensitive, g = global)
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) => {
        if (part.toLowerCase() !== normalizedHighlight.toLowerCase()) {
          return <span key={`${part}-${index}`}>{part}</span>;
        }

        return <TextHighlight key={`${part}-${index}`}>{part}</TextHighlight>;
      })}
    </>
  );
};

const TextHighlight = styled.mark`
  background: ${(props) => props.theme.colors.warning1};
  padding: 0 1px;
`;
