import express from "express";
const userRoute = express.Router();
import {
  handleCreateUser,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUser,
} from "../controller/user.js";

userRoute.get("/", handleGetAllUsers);
userRoute.get("/:id", handleGetUserById);
userRoute.post("/", handleCreateUser);
userRoute.patch("/:id", handleUpdateUserById);
userRoute.delete("/:id", handleDeleteUser);

export default userRoute;
