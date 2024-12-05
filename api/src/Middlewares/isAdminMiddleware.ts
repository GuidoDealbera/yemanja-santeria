import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../Utils/jwt";
import { DataBase } from "../db";
const { User } = DataBase.conn.models;

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json("Invalid token");
      return;
    }
    const decode: any = verifyToken(token);
    const { id } = decode;
    const user: any = await User.findByPk(id);
    if (!user) {
      res.status(404).json("User not found!");
      return;
    }
    req.user = user;
    if (user.isAdmin) {
      next();
    } else {
      res.status(401).json("Access denied. Requires administrator permissions");
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(401).json(error);
  }
};

export default isAdmin;
