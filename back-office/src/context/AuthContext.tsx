import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";
import { login } from "../services/auth";

interface DecodedUser {
  name: string;
  email: string;
  password: string;
  role: string;
  adress: string;
  phone: string;
  isVerified: boolean;
  exp: number;
  iat: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: DecodedUser | null;
  token: string | null;
  loginUser: (credentials: { email: string; password: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const allowedRoles = ["Modérateur", "Administrateur", "Super Admin"];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<DecodedUser | null>(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) return null;

    try {
      return jwtDecode<DecodedUser>(savedToken);
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return (
      !!token &&
      user !== null &&
      allowedRoles.includes(user.role) &&
      user.isVerified
    );
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      try {
        const decoded = jwtDecode<DecodedUser>(data.token);

        if (allowedRoles.includes(decoded.role) && decoded.isVerified) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setUser(decoded);
          setIsAuthenticated(true);
        } else {
          console.warn("Accès refusé : rôle non autorisé");
        }
      } catch (err) {
        console.error("Erreur de décodage du token :", err);
      }
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
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loginUser, logout, token }}
    >
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
