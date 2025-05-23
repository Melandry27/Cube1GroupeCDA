import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import * as AuthService from "../app/services/authService";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  adress: string;
  phone: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const TOKEN_KEY = "auth_token";

interface DecodedToken {
  _id: string;
  name: string;
  email: string;
  role: string;
  adress: string;
  phone: string;
  isVerified: boolean;
}

const initializeAuthState = async (): Promise<{
  token: string | null;
  user: User | null;
}> => {
  const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
  if (storedToken) {
    try {
      const decoded = jwtDecode<DecodedToken>(storedToken);

      return {
        token: storedToken,
        user: { ...decoded },
      };
    } catch (e) {
      console.log(
        "Token invalide ou erreur de récupération utilisateur, suppression."
      );
      await AsyncStorage.removeItem(TOKEN_KEY);
    }
  }
  return { token: null, user: null };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<{
    user: User | null;
    token: string | null;
  }>({
    user: null,
    token: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const initialState = await initializeAuthState();
      setAuthState(initialState);
      setLoading(false);
    };
    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await AuthService.login(email, password);

    if (!res.token) {
      return false;
    }

    await AsyncStorage.setItem(TOKEN_KEY, res.token);
    const decoded = jwtDecode<DecodedToken>(res.token);

    if (!decoded.isVerified) {
      await AsyncStorage.removeItem(TOKEN_KEY);
      return Alert.alert(
        "Erreur",
        "Votre compte n'est pas encore vérifié. Veuillez vérifier votre adresse e-mail."
      );
    }

    setAuthState({
      token: res.token,
      user: { ...decoded },
    });

    return true;
  };

  const logout = async () => {
    setAuthState({ user: null, token: null });
    await AsyncStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
};
