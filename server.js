import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.model.js";

// const Product = require("./models/product.model.js");

const app = express();
const mondoDBURL = "mongodb+srv://chandutempcs:Chandu12@chat-app.sqtdytd.mongodb.net/crud1?retryWrites=true&w=majority&appName=chat-app";

//middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//
//testing api
app.get("/", (req, res) => {
  res.send("chandu its an get response ");
});

//get all products api
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// get one product api
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const procuct = await Product.findById(id);
    res.status(200).json(procuct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//create product
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);

    // console.log(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(mondoDBURL)
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(3000, () => {
      console.log("listening to port 2000");
    });
  })
  .catch((error) => {
    console.log(error, "connection failed");
  });

// app.get("/api/user/:num", async (req, res) => {
//   const { num } = req.params;
//   console.log(num);
// });
