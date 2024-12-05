import { Request, Response } from "express";
import { DataBase } from "../../db";
const { Product, User } = DataBase.conn.models;

const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      include: {
        model: User,
        attributes: { exclude: ["password"] },
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export default getAllProducts;
