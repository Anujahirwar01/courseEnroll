import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

    useEffect(() => {
        const initializeAuth = async () => {
            console.log('API Base URL:', API_BASE_URL);
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    // Use full API URL and correct endpoint
                    const response = await axios.get(`${API_BASE_URL}/users/profile`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    if (response.data.user) {
                        setUser(response.data.user);
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    console.error('Token validation failed:', error);
                    // Token invalid - clear it
                    localStorage.removeItem('token');
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } else {
                // No token found
                setUser(null);
                setIsAuthenticated(false);
            }

            setIsLoading(false);
        };

        initializeAuth();
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

    const validateToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            logout();
            return false;
        }
        return true;
    };

    const login = async (credentials) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/users/login`, credentials);

            if (res.data.token && res.data.user) {
                // Store token in localStorage
                localStorage.setItem('token', res.data.token);
                setUser(res.data.user);
                setIsAuthenticated(true);
                return { success: true, user: res.data.user };
            }

            return { success: false, error: "Invalid response from server" };
        } catch (err) {
            console.error("Login failed", err);
            return { success: false, error: err.response?.data?.message || "Login failed" };
        }
    };

    const register = async (userData) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/users/register`, userData);

            if (res.data.token && res.data.user) {
                // Store token in localStorage
                localStorage.setItem('token', res.data.token);
                setUser(res.data.user);
                setIsAuthenticated(true);
                return { success: true, user: res.data.user };
            }

            return { success: false, error: "Invalid response from server" };
        } catch (err) {
            console.error("Registration failed", err);
            return { success: false, error: err.response?.data?.message || "Registration failed" };
        }
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.get(`${API_BASE_URL}/users/logout`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            // Always clear local state and token
            localStorage.removeItem('token');
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
