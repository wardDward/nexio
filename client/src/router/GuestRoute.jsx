import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const GuestRoute = () => {
  const { authFlag } = useSelector((state) => state.users);

  return !authFlag ? <Outlet/> : <Navigate to="/" />;
};

export default GuestRoute;
