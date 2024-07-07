import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { userToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector(userToken);

  if (!token) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
