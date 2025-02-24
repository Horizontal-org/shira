import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";

const LogoutLayout = () => {
  const navigate = useNavigate()

  const {
    logout
  } = useStore((state) => ({
    logout: state.logout,    
  }), shallow)
  
  useEffect(() => {
    logout()
    navigate('/login')
  }, []);

  return null;
};

export default LogoutLayout;
