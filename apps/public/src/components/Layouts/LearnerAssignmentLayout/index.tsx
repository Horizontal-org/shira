import { FunctionComponent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const LearnerAssignmentLayout: FunctionComponent = () => {
  const navigate = useNavigate();
  const { hash } = useParams();

  useEffect(() => {
    navigate(`/learner-quiz/${hash}`, { replace: true });
  }, [navigate]);

  return (<></>);
};