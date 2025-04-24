export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return await res.json();
};
