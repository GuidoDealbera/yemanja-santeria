import 'dotenv/config';
const {FRONTEND_URL} = process.env;
import { Router } from "express";
import localStrategy from "../Middlewares/local.strategy";
import passport from "../Middlewares/passportMiddleware";
import {authGoogle, authLocal} from "../Controllers";
const authRouter = Router();

//LOCAL
authRouter.post("/login", localStrategy, authLocal);
//GOOGLE
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback", passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/auth/login` }), authGoogle)

export { authRouter };
