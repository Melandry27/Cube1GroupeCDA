import jwt from "jsonwebtoken";

export const createVerificationToken = (email: string, JWT_SECRET: string) =>
  jwt.sign({ email }, JWT_SECRET, {
    expiresIn: "1h",
  });
