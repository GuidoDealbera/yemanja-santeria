import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../Utils/jwt";

const authorizatedToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json("Invalid token");
    }
    const decode: any = verifyToken(token);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

export default authorizatedToken;