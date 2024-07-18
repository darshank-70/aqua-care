const express = require("express");
const mongoose = require("mongoose");
const Order = require("../../models/order");
const Cart = require("../../models/cart");

const router = express.Router();

// methods
// 1. placeOrder
// 2. cancelOrder

// ROutes
// 1. POST - PlaceOrder
// 2. DELETE - CancelOrder
// 3. GET - customerOrders
// 4. PATCH - updateOrder

const placeOrder = async (req, res) => {
  const { customerId, totalAmount, deliveryLocation } = req.body;
  const cartItems = await Cart.find({ customerId });
  // cartItems array's element will have productId,quantity

  if (!cartItems || cartItems.length === 0) {
    return res
      .status(404)
      .json({ message: "No items in the cart to place an order" });
  }

  try {
    const newOrder = new Order({
      customerId,
      cartItems,
      totalAmount,
      deliveryLocation,
      status: "ordered",
    });
    const ordered = await newOrder.save();
    res.status(200).json(ordered);
  } catch (err) {
    res.status(500).json({ message: "could not place a Order,server Error" });
  }
};
const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order canceled successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error canceling order", error });
  }
};
const getCustomerOrders = async (req, res) => {
  const { customerId } = req.params;

  try {
    const orders = await Order.find({ customerId });
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this customer" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving customer orders", error });
  }
};
// admin can get All orders
const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find().populate(
      "customerId cartItems.productId"
    );

    if (!allOrders || allOrders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(allOrders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 1.
router.post("/", placeOrder);
// 2.
router.patch("/update/:orderId", updateOrder);
// 3.
router.get("/", getAllOrders);
// 4.
router.get("/:customerId", getCustomerOrders);

module.exports = router;
