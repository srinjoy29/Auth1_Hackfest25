"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { toast } from "sonner";

// Create Context with default value as null
const AuthContext = createContext(null);

// Centralized Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/auth",
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout for better performance
  
});

// Centralized error handler
const handleApiError = (error) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "An unexpected error occurred";
  }
  return "An unknown error occurred";
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get("/me");
        setUser(data.user);
      } catch (error) {
        setError(handleApiError(error));
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post("/logout");
      setUser(null);
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};