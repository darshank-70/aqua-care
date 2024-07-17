const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerPhone: {
      type: String,
      required: true,
      trim: true,
      //   validate: {
      //     validator: function (v) {
      //       return /\d{10}/.test(v);
      //     },
      //     message: (props) => `${props.value} is not a valid phone number!`,
      //   },
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      //   validate: {
      //     validator: function (v) {
      //       return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      //     },
      //     message: (props) => `${props.value} is not a valid email address!`,
      //   },
    },
    customerPassword: {
      type: String,
      required: true,
    },
    customerAddress: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
