import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import CategoryController from "./controllers/CategoryController";
import OrderController from "./controllers/OrderController";
import ProductsController from "./controllers/ProductsController";
import userController from "./controllers/userController";
import auth from "../src/utils/auth";
import adminAuth from "./utils/adminAuth";

const routes = Router();
const upload = multer(uploadConfig);

// Products API
routes.get("/products",  ProductsController.index);
routes.get("/products/:id",  ProductsController.show);
routes.post(
  "/products",
  auth,
  adminAuth,
  upload.array("photos"),
  ProductsController.create
);
routes.post(
  "/products/:id",
  auth,
  adminAuth,
  upload.array("photos"),
  ProductsController.update
);
routes.delete("/products/:id", auth, adminAuth, ProductsController.delete);

// Categorys API
routes.get("/categorys", CategoryController.index);
routes.get("/categorys/:id", CategoryController.show);
routes.post("/categorys", auth, adminAuth, CategoryController.create);
routes.post("/categorys/:id", auth, adminAuth, CategoryController.update);
routes.delete("/categorys/:id", auth, adminAuth, CategoryController.delete);

// Orders API
routes.get("/order", auth, OrderController.index);
routes.get("/order/:id", auth, OrderController.show);
routes.post("/order", auth, OrderController.create);
routes.post("/order/:id", auth, OrderController.update);
routes.delete("/order/:id", auth, OrderController.delete);

// Users API
routes.post("/register", userController.create);
routes.get("/login", userController.auth);
routes.post("/registerAdmin", auth, adminAuth, userController.registerAdmin);

export default routes;
