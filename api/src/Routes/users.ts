import { Router } from "express";
import { allUsers, postUser, userById } from "../Controllers";
const router = Router();

router.get("/", allUsers);
router.get("/:id", userById);
router.post("/new", postUser);

export {router};