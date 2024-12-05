import { Router } from "express";
import { readdirSync } from "fs";
const PATH_ROUTER = `${__dirname}`;
const router = Router();

const cleanFileName = (filename: string) => {
  return filename.split(".")[0];
};

readdirSync(PATH_ROUTER).filter((filename) => {
  const cleanFile = cleanFileName(filename);
  if (cleanFile !== "index" && cleanFile !== "auth" && filename.endsWith(".ts")) {
    import(`./${cleanFile}`)
      .then((moduleRoute) => {
        router.use(`/${cleanFile}`, moduleRoute.router);
      })
      .catch((error) => {
        console.error(`Error al cargar la ruta ${cleanFile}:`, error);
      });
  }
});

export { router };
