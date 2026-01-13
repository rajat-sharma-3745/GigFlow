import { createContext, useState, useEffect } from "react";
import { authAPI } from "../api/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const data = await authAPI.login(credentials);
    setUser(data.data.user);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    setIsAuthModalOpen(false);
    return data;
  };

  const register = async (userData) => {
    const data = await authAPI.register(userData);
    setUser(data.data.user);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    setIsAuthModalOpen(false);
    return data;
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
    localStorage.removeItem("user");
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        register,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
