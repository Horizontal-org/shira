import { defaultTheme, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent } from "react";
import { AppLayout } from "../../QuestionPreview/AppLayout";
import type { UIExplanation } from "../../QuestionPreview/types";
import {
  isMessagingNotPhoneApp,
  isMessagingPhoneApp,
  normalizePreviewAppName,
} from "../../../utils/appNames";
import { toImageEntries } from "../../../utils/parseHtml";

type Props = {
  appName: string | null;
  content: string;
  images?: { id: number; name: string; url: string }[];
  explanations?: UIExplanation[];
  explanationNumber: number;
  showExplanations: boolean;
};

export const QuestionPreviewFrame: FunctionComponent<Props> = ({
  appName,
  content,
  images,
  explanations,
  explanationNumber,
  showExplanations,
}) => {
  return (
    <AppFrame
      $isFullWidth={isMessagingNotPhoneApp(appName)}
      $isPhoneFrame={isMessagingPhoneApp(appName)}
      $hasWhiteBackground={normalizePreviewAppName(appName) === "Messenger"}
    >
      <AppLayout
        appName={appName}
        content={content}
        images={toImageEntries(images)}
        showExplanations={showExplanations}
        explanations={explanations}
        explanationNumber={explanationNumber}
      />
    </AppFrame>
  );
};

const AppFrame = styled.div<{
  $isFullWidth: boolean;
  $isPhoneFrame: boolean;
  $hasWhiteBackground: boolean;
}>`
  position: relative;
  width: ${(props) => (props.$isFullWidth ? "100%" : "fit-content")};
  max-width: 100%;
  height: ${(props) => (props.$isPhoneFrame ? "80vh" : "68vh")};
  min-height: 620px;
  max-height: ${(props) => (props.$isPhoneFrame ? "none" : "780px")};
  background: ${(props) => (
    props.$hasWhiteBackground ? defaultTheme.colors.light.white : "transparent"
  )};
`;
