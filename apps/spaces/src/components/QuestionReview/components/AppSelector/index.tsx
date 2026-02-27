import { DatingApp, FBMessenger, Gmail, Outlook, SMS, Whatsapp } from "@shira/ui";
import { FunctionComponent } from "react";
import { Explanation } from "../../../../store/slices/explanation";
// TODO repeated code, check how to fix  
import './styles.css'

interface Props {
  appName: string;
  // dont kill me gus
  customProps: any
  explanations?: Explanation[]
  explanationNumber: number
  showExplanations: boolean
}

export const AppSelector: FunctionComponent<Props> = ({
  appName,
  customProps,
  explanationNumber,
  explanations,
  showExplanations
}) => {
  console.log("🚀 ~ AppSelector ~ customProps:", customProps)

  return (
    <>
      {appName === 'Gmail' && (
        <Gmail
          {...customProps}
          id="gmail-app"
          receiverEmail={'useremail@email.com'}
          receiverName={'User'}
          explanationNumber={explanationNumber}
          explanations={explanations}
          showExplanations={showExplanations}
        />
      )}
      {appName === 'Outlook' && (
        <Outlook
          {...customProps}
          id="outlook-app"
          receiverEmail={'useremail@email.com'}
          receiverName={'User'}
          explanationNumber={explanationNumber}
          explanations={explanations}
          showExplanations={showExplanations}
        />
      )}
      {appName === 'Whatsapp' && (
        <Whatsapp
          {...customProps}
          id="whatsapp-app"
          explanationNumber={explanationNumber}
          explanations={explanations}
          showExplanations={showExplanations}
        />
      )}
      {appName === 'SMS' && (
        <SMS
          {...customProps}
          id="sms-app"
          explanationNumber={explanationNumber}
          explanations={explanations}
          showExplanations={showExplanations}
        />
      )}
      {appName === 'Messenger' && (
        <FBMessenger
          {...customProps}
          id="messenger-app"
          explanationNumber={explanationNumber}
          explanations={explanations}
          showExplanations={showExplanations}
        />
      )}
      {appName === 'Dating App' && (
        <DatingApp
          {...customProps}
          id="dating-app"
          explanationNumber={explanationNumber}
          explanations={explanations}
          showExplanations={showExplanations}
        />
      )}
    </>
  )
}
