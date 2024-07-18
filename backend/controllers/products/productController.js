const mongoose = require("mongoose");
const express = require("express");
const Product = require("../../models/product");
const router = express.Router();

// ROutes
// 1. GET -  getAll products
// 2. POST - add new Product
// 3. PATCH - update a Product using ID
// 4. DELETE - delete a Product using ID
// 5. GET - get a Product using ID

// 1. GET - Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 2. POST - Add a new product
router.post("/add", async (req, res) => {
  const {
    productName,
    productPrice,
    productDetails,
    productImageUrl,
    productAvailability,
  } = req.body;
  const newProduct = new Product({
    productName,
    productPrice,
    productDetails,
    productImageUrl,
    productAvailability,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Error adding product", error });
  }
});

// 3. PATCH - Update a product using ID
router.patch("/:productId", async (req, res) => {
  const { productId } = req.params;
  const updates = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error });
  }
});

// 4. DELETE - Delete a product using ID
router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 5. GET - Get a product using ID
router.get("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
