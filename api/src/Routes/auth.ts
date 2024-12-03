import 'dotenv/config';
const {FRONTEND_URL} = process.env;
import { Router } from "express";
import localStrategy from "../Middlewares/local.strategy";
import passport from "../Middlewares/passportMiddleware";
import {authGoogle, authLocal} from "../Controllers";
const router = Router();

//LOCAL
router.post("/login", localStrategy, authLocal);
//GOOGLE
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/auth/login` }), authGoogle)

export { router };
