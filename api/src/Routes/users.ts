import { Router } from "express";
import { allUsers, inactiveUser, postUser, userById } from "../Controllers";
import isAdmin from "../Middlewares/isAdminMiddleware";
import upload from "../Utils/multer.config";
const router = Router();

//GET
router.get("/", allUsers);
router.get("/:id", userById);

//POST
router.post("/new", upload.single("profilePhoto"), postUser);

//PUT
router.put("/inactive/:id", isAdmin, inactiveUser);

export { router };
