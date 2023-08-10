import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAccount } from "wagmi";

import { useAuthContext } from "../context/AuthContext";

const RequireAuth = ({children, authLink}) => {
    const auth = useAuthContext();
    const account = useAccount();
    const location = useLocation();
    if (!auth.user || !auth.user?.token || account.address === undefined || account.address === "") {
        return <Navigate to={authLink} state={{from: location.pathname}} />
    }
    return children;
}

export default RequireAuth;