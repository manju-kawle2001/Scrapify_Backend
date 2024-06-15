import { Navigate } from "react-router-dom";
export default ({ children }) => {
    if (sessionStorage.getItem('current-user'))
        return children;
    else
        return <Navigate to="/" />
}