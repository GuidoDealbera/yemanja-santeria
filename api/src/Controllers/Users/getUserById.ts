import { Request, Response } from "express";
import { DataBase } from "../../db";
const { User, Product } = DataBase.conn.models;
const getUserById = async (req: Request, res: Response) => {
  try {
    const findUser = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
      },
      attributes: { exclude: ["password"] },
    });
    if (!findUser) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    res.status(200).json(findUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export default getUserById;
