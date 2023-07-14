import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import Loading from "../Loading/Loading";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isLoading, user } = useAppSelector((state) => state.user);
  const location = useLocation();
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }

  if (!user?.email) {
    return <Navigate state={location.pathname} to="/sign-in" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
