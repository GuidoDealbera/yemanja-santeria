import { Request, Response } from "express";
import { DataBase } from "../../db";
const { User } = DataBase.conn.models;

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export default getAllUsers;
