const mongoose = require("mongoose");
const express = require("express");
const Cart = require("../../models/cart");
const router = express.Router();

const addProductToCart = async (customerId, productId, quantity) => {
  try {
    let cart = await Cart.findOne({ customerId });
    if (!cart) {
      cart = new Cart({ customerId, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    return cart;
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

const removeProductFromCart = async (customerId, productId) => {
  try {
    let cart = await Cart.findOne({ customerId });
    if (cart) {
      cart.products = cart.products.filter(
        (p) => p.productId.toString() !== productId
      );
      await cart.save();
    }
    return cart;
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }
};
const viewCart = async (customerId) => {
  try {
    const cart = await Cart.findOne({ customerId }).populate(
      "products.productId"
    );
    return cart;
  } catch (error) {
    console.error("Error viewing cart:", error);
  }
};

// Routes
// 1. add to cart
// 2. remove from cart
// 3. get Cart for customer

// 1
router.post("/add", async (req, res, next) => {
  const { customerId, productId, quantity } = req.body;
  try {
    const cart = await addProductToCart(customerId, productId, quantity);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
});
// 2
router.post("/remove", async (req, res) => {
  const { customerId, productId } = req.body;
  try {
    const cart = await removeProductFromCart(customerId, productId);
    res.status(200).json({ cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing product from cart", error });
  }
});

// 3
router.get("/:customerId", async (req, res) => {
  const { customerId } = req.params;
  try {
    const cart = await viewCart(customerId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error viewing cart", error });
  }
});

module.exports = router;
