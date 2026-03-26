import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import api from "../api/axios";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (data) => {
        const res = await api.post("/auth/login", data);
        setUser(res.data.user);
    };

    const logout = async () => {
        await api.post("/auth/logout");
        setUser(null);
    };

    const checkAuth = async () => {
        try {
            const res = await api.get("/auth/me");
            setUser(res.data.user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
