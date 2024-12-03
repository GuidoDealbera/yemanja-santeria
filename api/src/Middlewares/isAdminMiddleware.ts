import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../Utils/jwt";
import { DataBase } from "../db";
const { User } = DataBase.conn.models;

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json("Invalid token");
    }
    const decode: any = verifyToken(token);
    const { id } = decode;
    const user: any = await User.findByPk(id);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    req.user = user;
    if (user.isAdmin) {
      next();
    } else {
      return res
        .status(401)
        .json("Access denied. Requires administrator permissions");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

export default isAdmin;