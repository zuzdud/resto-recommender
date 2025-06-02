import {Navigate, Outlet} from 'react-router-dom';

export function PrivateRoute() {
    //const token = localStorage.getItem("token");
    const token = true;
    console.log(token)
    return token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;