if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authController = require("./controllers/auth/authController");
const productController = require("./controllers/products/productController");
const cartController = require("./controllers/cart/cartController");
const orderController = require("./controllers/orders/orderController");
const app = express();
app.use(cors());
app.use(express.json());
console.log(process.env.NODE_ENV);
mongoose
  .connect(process.env.MONGO_URI)
  .then(
    // start server after database connection Success
    app.listen(process.env.PORT || 8000, () =>
      console.log(
        "Database connection Success, server on port ",
        process.env.PORT
      )
    )
  )
  .catch((connectionErr) =>
    console.error("db connection ERROR", connectionErr)
  );
//   Routes
app.get("/", (req, res, next) => {
  res.status(200).send("Hello World");
});
// Endpoints
// 1. auth
// 2. products
// 3. cart
//
app.use("/auth", authController);
app.use("/products", productController);
app.use("/cart", cartController);
app.use("/orders", orderController);
