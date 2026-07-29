import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../components/Loader/Loader";

const VerifiedRoute = ({ children }) => {
  const { initialized, isAuthenticated, emailVerified } = useSelector((state) => state.auth);

  if (!initialized) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

export default VerifiedRoute;