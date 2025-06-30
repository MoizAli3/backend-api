import express from "express";
import Product from "../models/product.js";
import joi from "joi";
import fs from "fs";
import multer from "multer";
import cloudinary from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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
    const getDbProduct = await Product.findById(id);
    res.status(200).send({ getDbProduct });
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal Server Error!" });
  }
};

export const handleUpdateProductById = async (req, res) => {
  try {
    const { title, price, category, discription } = req.body;
    const id = req.params.id;

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

          const productData = await Product.findByIdAndUpdate(id, {
            title,
            price,
            image: result.url,
            category,
            discription,
          });

          console.log(productData);

          res.status(200).send({
            status: 200,
            message: "Product updated Succesully!",
            data: productData,
          });
        }
      );
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal Server Error!" });
  }
};

export const handleDeleteProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ status: 404, message: "Product not found!" });
    }

    res.status(200).send({
      message: "Product Deleted successfully!",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal Server Error!" });
  }
};
