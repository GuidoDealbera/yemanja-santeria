import { Router } from "express";
import { allProducts, postProduct, productById } from "../Controllers";
import upload from "../Utils/multer.config";

const router = Router();

//GET
router.get("/", allProducts);
router.get("/:id", productById);

//POST
router.post("/new", upload.array("images", 5), postProduct)
//PUT

export {router};