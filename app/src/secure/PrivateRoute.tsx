import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import CheckToken from "../services/CheckToken";

interface PrivateRouteProps {
    element: React.ReactNode;
}

export default function PrivateRoute({ element }: PrivateRouteProps) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<string>("");

    useEffect(() => {
        CheckToken(Cookies.get("token"))
            .then(data => setUser(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return null; 
    }

    return user === "" ? <Navigate to="/" replace /> : <>{element}</>;
}
