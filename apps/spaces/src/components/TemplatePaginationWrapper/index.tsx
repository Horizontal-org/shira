import { styled } from "@horizontal-org/shira-ui";

type Props = {
  $visible?: boolean;
  $inactive?: boolean;
};

export const TemplatePaginationWrapper = styled.div<Props>`
  box-sizing: border-box;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  width: 100%;
  visibility: ${(props) => (props.$visible ?? true ? "visible" : "hidden")};
  pointer-events: ${(props) => (props.$inactive ? "none" : "auto")};
`;
