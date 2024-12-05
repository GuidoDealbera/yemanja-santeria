import { Request, Response } from "express";
import { DataBase } from "../../db";
import Joi from "joi";
import cloudinary from "../../Utils/cloudinary.config";

const { Product } = DataBase.conn.models;

// Esquema de validación con Joi
const productSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(10).max(1000).required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  images: Joi.array().items(Joi.any()).required(), // Validamos un array de archivos
});

const postProduct = async (req: Request, res: Response) => {
  try {
    // Validar el cuerpo de la solicitud
    const { error, value } = productSchema.validate({
      ...req.body,
      images: req.files,
    });
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { name, description, price, stock } = value;
    const files = req.files as Express.Multer.File[];
    const uploadedImages: string[] = [];

    // Subir imágenes a Cloudinary
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });
      uploadedImages.push(result.secure_url); // Guardamos las URLs seguras
    }

    // Crear el producto en la base de datos
    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      images: uploadedImages, // Guardamos las URLs de las imágenes
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export default postProduct;
