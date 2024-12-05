import { Request, Response } from "express";
import { generateToken } from "../../Utils/jwt";
import { JWTPayload } from "../../Interfaces/interfaces";
import { DataBase } from "../../db";
import 'dotenv/config';
const {FRONTEND_URL} = process.env;
const { User } = DataBase.conn.models;

const authGoogle = async (req: Request, res: Response) => {
  try {
    let user = req.user as any;
    const isAdmin = await User.count() === 0;
    const findUser = await User.findOne({ where: { googleId: user.googleId } });
    if (findUser) {
      user = findUser;
    } else {
      user = (await User.create({
        ...user,
        isAdmin
      })).toJSON();
    }
    const payload: JWTPayload = { id: user.id, email: user.email };
    const token = generateToken(payload);
    res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export default authGoogle;