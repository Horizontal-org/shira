import { FunctionComponent } from "react";
import { LearnerBulkImportFlow } from "../LearnerBulkImportFlow";

interface Props { }

export const LearnersBulkImportLayout: FunctionComponent<Props> = () => {

  return (
    <LearnerBulkImportFlow
      onSubmit={() => console.log('Submitted')}
    />
  )
}