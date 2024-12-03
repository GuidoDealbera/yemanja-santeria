import { Request, Response } from "express";
import { DataBase } from "../../db";
import { UserAttributes } from "../../Interfaces/interfaces";
import bcrypt from "bcrypt";
const { User } = DataBase.conn.models;

const postUser = async (req: Request, res: Response) => {
    try {
        let passwordHash;
        const {
            address,
            email,
            name,
            password,
            phone
        } = req.body as UserAttributes;
        const userCount = await User.count();
        const check2 = password && password.length > 0;
        const isAdmin = userCount === 0;
        if(check2){
            passwordHash = await bcrypt.hash(password, 10);
        }
        const user = await User.create({
            name,
            email,
            isAdmin,
            phone,
            address,
            password: passwordHash
        })
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
}

export default postUser;