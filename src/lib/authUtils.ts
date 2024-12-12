import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION = "1h";

export type JwtPayloadInput = {
  id: string;
  email: string;
  role: "ADMIN" | "SUPERADMIN" | "USER";
};

export const generateToken = (user: JwtPayloadInput): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION },
  );
};

export const generateRefreshToken = (user: JwtPayloadInput): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  );
};
