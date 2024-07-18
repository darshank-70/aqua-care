const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    issue: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    serviceLocation: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    issueStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "issued", "completed", "cancelled"],
    },
  },
  { timestamps: true }
);

serviceSchema.pre(/^find/, function (next) {
  this.populate("customer");
  next();
});

module.exports = mongoose.model("Service", serviceSchema);
