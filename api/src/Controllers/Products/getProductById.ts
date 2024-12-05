import { Request, Response } from "express";
import { DataBase } from "../../db";
const { Product, User } = DataBase.conn.models;

const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: User,
                attributes: { exclude: ["password"] }
            }
        })
        if (!product) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el producto" });
    }
};

export default getProductById;