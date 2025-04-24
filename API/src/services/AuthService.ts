import jwt from "jsonwebtoken";

export const createVerificationToken = (email: string, JWT_SECRET: string) =>
  jwt.sign({ email }, JWT_SECRET, {
    expiresIn: "1h",
  });
export const generateNewPassword = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";

  let password = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};
