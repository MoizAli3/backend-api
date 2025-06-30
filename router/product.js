import express from "express";
import { upload } from "../controller/product.js";

import {
  handleGetAllProducts,
  handleGetAllProductsById,
  handleUpdateProductById,
  handleDeleteProductById,
  handleCreateProduct,
} from "../controller/product.js";

const productRoute = express.Router();


productRoute.post("/", upload.single("images"), handleCreateProduct);

productRoute.get("/", handleGetAllProducts);
productRoute.get("/:id", handleGetAllProductsById);
productRoute.put("/:id", handleUpdateProductById);
productRoute.delete("/:id", handleDeleteProductById);

export const uploaded = upload;

export default productRoute;
