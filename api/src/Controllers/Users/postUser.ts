import { Request, Response } from "express";
import { DataBase } from "../../db";
import bcrypt from "bcrypt";
import Joi from "joi";
import cloudinary from "../../Utils/cloudinary.config";


const { User } = DataBase.conn.models;

// Esquema de validación con Joi
const userSchema = Joi.object({
  address: Joi.string().allow(null, ""),
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(8).regex(/[A-Z]/).regex(/[0-9]/).required(),
  phone: Joi.string().allow(null, ""),
  profilePhoto: Joi.any().optional(),
});

const postUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const { address, email, name, password, phone } = value;
    let profilePhoto = null;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "Email ya registrado" });
      return;
    }
    if(req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "users",
      });
      profilePhoto = result.secure_url;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const isAdmin = (await User.count()) === 0;
    const user = await User.create({
      name,
      email,
      isAdmin,
      phone,
      address,
      password: passwordHash,
      profilePhoto,
    });
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(201).json(userWithoutPassword);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export default postUser;

//router.post("/upload", upload.single("profilePhoto"), async (req, res) => {
  //   req.file?.path &&
  //     cloudinary.uploader.upload(req.file?.path, (err, result) => {
  //       if (err) {
  //         console.error(err);
  //         res.status(500).json({
  //           success: false,
  //           message: err.message,
  //         });
  //         return;
  //       } else {
  //         res.status(200).json({
  //           success: true,
  //           message: "Imagen subida correctamente",
  //           image: result?.url,
  //         });
  //         return;
  //       }
  //     });
  // });