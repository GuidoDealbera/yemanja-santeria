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
      message: "Bienvenido a Santería y Herboristería Yemanja",
      accessToken,
      user: {
        id: user.id,
        googleId: user.googleId,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        phone: user.phone,
        address: user.address,
      },
    };
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export default authLogin;