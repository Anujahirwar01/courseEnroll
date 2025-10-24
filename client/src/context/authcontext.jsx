import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Fallback API URL if environment variable is not loaded
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

    useEffect(() => {
        console.log('API Base URL:', API_BASE_URL);
        console.log('Environment variable:', import.meta.env.VITE_API_BASE_URL);
        // Skip auth check for now since we don't have proper JWT setup
        setIsLoading(false);
        setIsAuthenticated(false);
        setUser(null);
    }, []);

    const checkAuthStatus = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`${API_BASE_URL}/users/profile`, {
                withCredentials: true
            });
            setUser(res.data.user);
            setIsAuthenticated(true);
        } catch (err) {
            console.error("Auth check failed: ", err);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/users/login`, credentials, {
                withCredentials: true
            });
            setUser(res.data.user);
            setIsAuthenticated(true);
            return { success: true, user: res.data.user };
        } catch (err) {
            console.error("Login failed", err);
            return { success: false, error: err.response?.data?.message || "Login failed" };
        }
    };

    const register = async (userData) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/users/register`, userData, {
                withCredentials: true
            });
            setUser(res.data.user);
            setIsAuthenticated(true);
            return { success: true, user: res.data.user };
        } catch (err) {
            console.error("Registration failed", err);
            return { success: false, error: err.response?.data?.message || "Registration failed" };
        }
    };

    const logout = async () => {
        try {
            await axios.get(`${API_BASE_URL}/users/logout`, {
                withCredentials: true,
            });
            setUser(null);
            setIsAuthenticated(false);
        } catch (err) {
            console.error("Logout failed", err);
            // Still clear local state even if server logout fails
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated,
            login,
            register,
            logout,
            checkAuthStatus
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
