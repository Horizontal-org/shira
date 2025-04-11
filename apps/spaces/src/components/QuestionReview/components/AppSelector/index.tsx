import { Gmail } from "@shira/ui";
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
  console.log("🚀 ~ customProps:", customProps)
  return (
    <>
      { appName === 'Gmail' && (
        <Gmail 
          {...customProps}
          explanationNumber={explanationNumber}
          explanations={explanations}
          showExplanations={showExplanations}
        />
      )}
    </>
  )
}