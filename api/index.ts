import express from "express";
import morgan from "morgan";
import cors from "cors";
import { router } from "./src/Routes";
import { authRouter } from "./src/Routes/auth";
import { DataBase } from "./src/db";
import "dotenv/config";
import session from "express-session";
import passport from "./src/Middlewares/passportMiddleware";
const { conn } = DataBase;
class Server {
  public app: express.Application = express();
  private port: Number = 3001;
  constructor() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(
      session({
        secret: "mySecret",
        resave: false,
        saveUninitialized: false,
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use("/api", router);
    this.app.use("/auth", authRouter);
    this.listen();
    this.connectToDatabase();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("Server Listening on port", this.port);
    });
  }
  private async connectToDatabase() {
    try {
      await conn.authenticate();
      console.log("BD CONECTADA");
      await conn.sync({ force: true });
      console.log("BD Sincronizada");
    } catch (error) {
      console.error("Error conexion BD", error);
    }
  }
}
new Server();
