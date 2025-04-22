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
    const roleId = "68023b49dbee466beb5c3cbf";
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, roleId, adress, phone }),
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
