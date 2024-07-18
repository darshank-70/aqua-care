const express = require("express");
const mongoose = require("mongoose");
const Order = require("../../models/order");

const router = express.Router();

// methods
// 1. placeOrder
// 2. cancelOrder

// ROutes
// 1. POST - PlaceOrder
// 2. PATCH - CancelOrder

const placeOrder = async (req, res) => {
  const { customerId, products, totalAmount, deliveryLocation } = req.body;
  try {
    const newOrder = new Order({
      customerId,
      products,
      totalAmount,
      deliveryLocation,
    });
    const ordered = await newOrder.save();
    res.status(200).json(ordered);
  } catch (err) {
    res.status(500).json({ message: "could not place a Order,server Error" });
  }
};
const cancelOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: "canceled" },
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
// 1.
router.post("/", placeOrder);
// 2.
router.patch("/cancel/:orderId", cancelOrder);
// 3.
router.get("/:customerId", getCustomerOrders);

module.exports = router;
