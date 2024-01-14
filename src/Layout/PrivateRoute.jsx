import { Outlet, useLocation, Navigate } from "react-router-dom";
import {getAuth} from "firebase/auth"
import app from "../Firebase/config";

const PrivateRoute = () => {
    const location = useLocation();
    const auth = getAuth(app);
  return auth.currentUser ? (<Outlet/>) : (
    <Navigate to = "authentication" state = {{from: location}}  replace/>
  )
}

export default PrivateRoute
