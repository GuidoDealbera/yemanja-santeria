import jwt from "jsonwebtoken";
import { JWTPayload } from "../Interfaces/interfaces";

const secret = "mysecret";
export const generateToken = (payload: JWTPayload) => {
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret, { ignoreExpiration: false });
    return decoded;
  } catch (err) {
    return err;
  }
};