import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from '../components/Loader/Loader.jsx';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, initialized } = useSelector(
    (state) => state.auth
  );

  if (!initialized) {
    return <h2><Loader/></h2>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;