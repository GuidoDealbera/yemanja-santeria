import { Request, Response } from "express";
import { DataBase } from "../../db";
const { User } = DataBase.conn.models;

const inactiveUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return; 
        };
        await user.update({ isActive });
        const updatedUser = await User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["password"]
            }
        });
        res.status(200).json({ message: "Usuario actualizado correctamente", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

export default inactiveUser;