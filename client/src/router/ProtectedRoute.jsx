import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { authFlag } = useSelector((state) => state.users);

  return authFlag ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
