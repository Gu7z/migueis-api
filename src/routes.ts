import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import CategoryController from "./controllers/CategoryController";
import ProductsController from "./controllers/ProductsController";

const routes = Router();
const upload = multer(uploadConfig);

// Products API
routes.get("/products", ProductsController.index);
routes.get("/products/:id", ProductsController.show);
routes.post("/products", upload.array("photos"), ProductsController.create);
routes.post("/products/:id", upload.array("photos"), ProductsController.update);
routes.delete("/products/:id", ProductsController.delete);

// Categorys API
routes.get("/categorys", CategoryController.index);
routes.get("/categorys/:id", CategoryController.show);
routes.post("/categorys", CategoryController.create);
routes.post("/categorys/:id", CategoryController.update);
routes.delete("/categorys/:id", CategoryController.delete);

export default routes;
