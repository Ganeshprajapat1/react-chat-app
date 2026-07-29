import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from '../components/Loader/Loader.jsx';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, initialized, emailVerified } = useSelector(
    (state) => state.auth
  );

  if (!initialized) {
    return (<Loader/>);
  }

  if (isAuthenticated) {
    if (!emailVerified) {
      return <Navigate to="/verify-email" replace />;
    }
    return <Navigate to="/chat" replace />;
  }

  return children;
};

export default PublicRoute;