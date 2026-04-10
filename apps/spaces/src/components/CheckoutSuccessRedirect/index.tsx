import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props { }

export const CheckoutSuccessRedirect: FunctionComponent<Props> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard?checkout=success", { replace: true });
  }, [navigate]);

  return null;
};
