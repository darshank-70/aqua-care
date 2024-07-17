const express = require("express");
const bcrypt = require("bcrypt");
const Customer = require("../../models/customer");
const router = express.Router();

// routes
// 1. /signup - POST
// 2. /login - POST

router.post("/signup", async (req, res, next) => {
  const {
    customerName,
    customerPhone,
    customerEmail,
    customerAddress,
    customerPassword,
  } = req.body.customerData;
  // check if customer with this email ID already eixsts
  const existingCustomer = await Customer.findOne({
    customerEmail: customerEmail,
  });
  if (existingCustomer)
    return res.status(400).json({ message: "Email Id already registered" });
  // other wise save the new User to Customercolleciron
  // also hash password

  const hashedPassword = await bcrypt.hash(customerPassword, 10);
  const newCustomer = new Customer({
    customerName,
    customerPhone,
    customerEmail,
    customerAddress,
    customerPassword: hashedPassword,
  });

  const result = await newCustomer.save();
  res.status(200).json(result);
});

router.post("/login", async (req, res, next) => {
  const { customerEmail, customerPassword } = req.body.customerData;
  // check if email is wrong?
  const existingCustomer = await Customer.findOne({ customerEmail });
  if (existingCustomer) {
    // if exists verify password
    const isPasswordMatch = bcrypt.compare(
      customerPassword,
      existingCustomer.customerPassword
    );
    if (isPasswordMatch)
      return res.status(200).json({ message: "Login Successful" });
  }
  //   login failed
  return res.status(400).json({ message: "Email or Password Incorrect" });
});
module.exports = router;
