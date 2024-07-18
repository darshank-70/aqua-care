const mongoose = require("mongoose");
const express = require("express");
const Cart = require("../../models/cart");
const router = express.Router();

const addProductToCart = async (customerId, productId, quantity) => {
  try {
    let cart = new Cart({ customerId, productId, quantity });

    await cart.save();
    return cart;
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

const removeProductFromCart = async (customerId, productId) => {
  try {
    let cart = await Cart.findOneAndDelete({ customerId, productId });
    return cart;
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }
};
const viewCart = async (customerId) => {
  try {
    const cart = await Cart.find({ customerId }).populate("productId");
    return cart;
  } catch (error) {
    console.error("Error viewing cart:", error);
  }
};

// Routes
// 1.POST  add to cart
// 2.DELETE remove from cart
// 3.GET get Cart for customer
// 4.PATCH update Cart[only quantity can be updated ]

// 1
router.post("/", async (req, res, next) => {
  const { customerId, productId, quantity } = req.body;
  try {
    const cart = await addProductToCart(customerId, productId, quantity);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
});
// 2
router.delete("/remove", async (req, res) => {
  const { customerId, productId } = req.body;
  try {
    const cart = await removeProductFromCart(customerId, productId);
    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }
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
// 4
router.patch("/", async (req, res) => {
  const { customerId, productId, quantity } = req.body;
  try {
    // Find and update the cart item
    const updatedCartItem = await Cart.findOneAndUpdate(
      { customerId, productId },
      { quantity },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({
      message: "Quantity updated successfully",
      cartItem: updatedCartItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating quantity", error });
  }
});
module.exports = router;
