import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const generateToken = (user: any, role: any) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: role.name,
      adress: user.adress,
      phone: user.phone,
      isVerified: user.isVerified,
    },
    JWT_SECRET
  );
};

export const generateTokenForAllUsers = (users: any[]) => {
  return users.map((user) => {
    const role = user.roleId;
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: role.name,
        adress: user.adress,
        phone: user.phone,
        isVerified: user.isVerified,
      },
      JWT_SECRET
    );
  });
};
