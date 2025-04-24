import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra?.API_URL;

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error during login:", error.message || error);
    throw error;
  }
};

export const signUp = async (
  name: string,
  email: string,
  password: string,
  adress: string,
  phone: string
) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, adress, phone }),
    });

    if (!response.ok) {
      throw new Error(
        `Sign-up failed: ${response.status} ${response.statusText}`
      );
    }

    return response.status === 201;
  } catch (error: any) {
    console.error("Error during sign-up:", error.message || error);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (response.status !== 200) {
      throw new Error("Password reset failed");
    }

    return response.status === 200;
  } catch (error: any) {
    console.error("Error during password reset:", error.message || error);
    throw error;
  }
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
  token: string
) => {
  try {
    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    });

    if (response.status !== 200) {
      throw new Error("Password change failed");
    }

    return response.status === 200;
  } catch (error: any) {
    console.error("Error during password change:", error.message || error);
    throw error;
  }
};
