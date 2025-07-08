const API_BASE = import.meta.env.VITE_API_URL ?? "http://34.224.12.85:3000";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return await res.json();
};
