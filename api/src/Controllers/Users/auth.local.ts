import { Request, Response } from "express";
import { generateToken } from "../../Utils/jwt";
import { JWTPayload } from "../../Interfaces/interfaces";

const authLogin = async (req: Request, res: Response) => {
  try {
    const user: any = req.user;
    const payload: JWTPayload = {
      id: user?.id,
      email: user?.email,
    };
    const accessToken = generateToken(payload);
    const response = {
      message: "Bienvenido a E-Commerce!",
      credentials: {
        accessToken,
        id: user?.id,
        email: user?.email,
      },
      profile: user,
    };
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export default authLogin;