import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { login } from "../services/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  loginUser: (credentials: { email: string; password: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
    },
    onError: (err) => {
      console.error("Login failed", err);
    },
  });

  const loginUser = (credentials: { email: string; password: string }) => {
    mutation.mutate(credentials);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logout }}>
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
