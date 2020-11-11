import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import ProductsController from "./controllers/ProductsController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/products", ProductsController.index);
routes.get("/products/:id", ProductsController.show);
routes.post("/products", upload.array("photos"), ProductsController.create);
routes.post("/products/:id", upload.array("photos"), ProductsController.update);
routes.delete("/products/:id", ProductsController.delete);

export default routes;
