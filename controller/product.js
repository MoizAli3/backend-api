import express from "express";
import Product from "../models/product.js";
import joi from "joi";
import fs from "fs";
import multer from "multer";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dkdqsi7sz",
  api_key: "287921436345998",
  api_secret: "iRIv38sJpHMATAj_6RaGcLV-a_k",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });

const productValidationSchema = joi.object({
  title: joi.string().min(3).max(40).required(),
  price: joi.string().min(1).max(10).required(),
  category: joi.string().min(3).max(15).required(),
  discription: joi.string().required(),
});


export const handleCreateProduct = async (req, res) => {
  try {
    const { title, price, category, discription } = req.body;

    await productValidationSchema.validateAsync(req.body);

    console.log(req.body);

    fs.readdirSync("images/").forEach((file) => {
      cloudinary.v2.uploader.upload(
        `images/${file}`,
        {},
        async (error, result) => {
          // Delete example_file.txt
          fs.unlink(`images/${file}`, (err) => {
            if (err) console.log(err);
            else {
              console.log("Success Uploaded");
            }
          });
          if (error) {
            return res
              .status(401)
              .send({ status: 401, message: "file not uploaded!", err: error });
          }

          const productData = await Product.create({
            title,
            price,
            image: result.url,
            category,
            discription,
          });

          console.log(productData);

          res.status(200).send({
            status: 200,
            message: "Product Added Succesully!",
            data: productData,
          });
        }
      );
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal Server Error!" });
  }
};

export const handleGetAllProducts = async (req, res) => {
  try {
    const getDbProducts = await Product.find({});
    res.status(200).send({ getDbProducts });
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal Server Error!" });
  }
};

export const handleGetAllProductsById = async (req, res) => {
  try {
    const id = req.params.id;
    const getDbUser = await User.findById(id);
    res.status(200).send({ getDbUser });
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal Server Error!" });
  }
};

export const handleUpdateProductById = async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    if (!username || !email || !password || !phone)
      return res.status(400).send({ message: "please filled all field!" });
    const id = req.params.id;

    const updateUser = await User.findByIdAndUpdate(id, {
      username,
      email,
      password,
      phone,
    });

    res.status(200).send({
      message: "User updated successfully!",
      user: updateUser,
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal Server Error!" });
  }
};

export const handleDeleteProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ status: 404, message: "User not found!" });
    }

    res.status(200).send({
      message: "User Deleted successfully!",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal Server Error!" });
  }
};
