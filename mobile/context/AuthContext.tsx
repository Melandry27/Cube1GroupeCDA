import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import * as AuthService from "../app/services/authService";
interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const TOKEN_KEY = "auth_token";

const initializeAuthState = async () => {
  const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
  if (storedToken) {
    try {
      const decoded: any = jwtDecode(storedToken);
      return {
        token: storedToken,
        user: { id: decoded.id, email: decoded.email, role: decoded.role },
      };
    } catch (e) {
      console.log("Invalid token, removing it.");
      await AsyncStorage.removeItem(TOKEN_KEY);
    }
  }
  return { token: null, user: null };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<{ user: User | null; token: string | null }>({
    user: null,
    token: null,
  });

  useEffect(() => {
    const initialize = async () => {
      const initialState = await initializeAuthState();
      setAuthState(initialState);
    };
    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await AuthService.login(email, password);
    if (!res.token) {
      throw new Error("Login failed");
    }
    await AsyncStorage.setItem(TOKEN_KEY, res.token);

    const decoded: any = jwtDecode(res.token);
    setAuthState({
      token: res.token,
      user: { id: decoded.id, email: decoded.email, role: decoded.role },
    });
  };

  const logout = async () => {
    setAuthState({ user: null, token: null });
    await AsyncStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
