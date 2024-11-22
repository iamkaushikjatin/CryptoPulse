import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";

const AuthChecker = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
};

export default AuthChecker;
