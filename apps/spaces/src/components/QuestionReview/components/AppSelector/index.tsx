import { Gmail, Whatsapp } from "@shira/ui";
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
  // content?: HTMLElement;
  // phone: {
  //     textContent: string;
  //     explanationPosition: string;
  // };
  // explanations?: Explanation[];
  // explanationNumber?: number;
  // showExplanations?: boolean;

  console.log("🚀 ~ AppSelector ~ appName:", appName)
  return (
    <>
      { appName === 'Gmail' && (
        <Gmail 
          {...customProps}
          receiverEmail={'useremail@email.com'}
          receiverName={'User'}
          explanationNumber={explanationNumber}
          explanations={explanations}
          showExplanations={showExplanations}
        />
      )}
      { appName === 'Whatsapp' && (
        <Whatsapp 
          {...customProps}
          explanationNumber={explanationNumber}
          explanations={explanations}
          showExplanations={showExplanations}
        />
      )}
      {/* { appName === 'SMS' && ()}
      { appName === 'Messenger' && ()}
      { appName === 'Dating App' && ()} */}
    </>
  )
}


    // {
    //     "id": 2,
    //     "name": "Whatsapp",
    //     "type": "messaging",
    //     "createdAt": "2022-12-07T15:32:44.000Z",
    //     "updatedAt": "2022-12-07T15:32:44.000Z"
    // },
    // {
    //     "id": 3,
    //     "name": "SMS",
    //     "type": "messaging",
    //     "createdAt": "2022-12-07T15:32:44.000Z",
    //     "updatedAt": "2022-12-07T15:32:44.000Z"
    // },
    // {
    //     "id": 4,
    //     "name": "Messenger",
    //     "type": "messaging",
    //     "createdAt": "2022-12-07T20:04:27.000Z",
    //     "updatedAt": "2022-12-07T20:04:27.000Z"
    // },
    // {
    //     "id": 5,
    //     "name": "Dating App",
    //     "type": "messaging",
    //     "createdAt": "2023-01-24T16:08:39.000Z",
    //     "updatedAt": "2023-01-24T16:08:39.000Z"
    // }