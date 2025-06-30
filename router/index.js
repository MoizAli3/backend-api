import express from "express";
import userRoute from "./user.js";
import productRoute from "./product.js";
const router = express.Router();

router.use("/users", userRoute);
router.use("/products", productRoute);


export default router;
