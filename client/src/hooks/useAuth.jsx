import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticated } from "../redux/feature/userSlice";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, authFlag, isLoading } = useSelector((state) => state.users);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(authenticated());
      setLoadingComplete(true);
    };
    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    if (loadingComplete) {
      if (user && user.email_verified_at === null) {
        navigate("/verify-email");
      } else {
        navigate("/");
      }
    }
  }, [loadingComplete, user, navigate]);

  return { user, authFlag, isLoading };
}
