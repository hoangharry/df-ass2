import { Route, Navigate } from "react-router-dom";
import { useAuthState } from "../store/userContext"


const AppRoute = ({ component: Component, isPrivate }) => {
    const userDetails = useAuthState();
    return isPrivate && !Boolean(userDetails.token) ? <Navigate to='/'/> : <Component />;
}

export default AppRoute;