import { Outlet, useLocation, Navigate } from "react-router-dom";
import { projectAuth } from "../Firebase/config";

const PrivateRoute = () => {
    const location = useLocation();

  return projectAuth.currentUser ? (<Outlet/>) : (
    <Navigate to = "authentication" state = {{from: location}}  replace/>
  )
}

export default PrivateRoute
