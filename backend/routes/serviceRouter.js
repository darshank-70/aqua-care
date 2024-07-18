const express = require("express");
const router = express.Router();

const {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
} = require("../controllers/services/serviceController");

router.get("/", getAllServices);

router.get("/:id", getService);

router.post("/", createService);

router.patch("/:id", updateService);

router.delete("/:id", deleteService);

module.exports = router;
