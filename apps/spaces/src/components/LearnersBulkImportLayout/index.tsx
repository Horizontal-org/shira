import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { LearnerBulkImportFlow } from "../LearnerBulkImportFlow";

interface Props { }

export const LearnersBulkImportLayout: FunctionComponent<Props> = () => {

  return (
    <LearnerBulkImportFlow
      onSubmit={() => console.log('Submitted')}
    />
  )
}