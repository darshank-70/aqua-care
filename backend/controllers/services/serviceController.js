const Service = require("../../models/serviceModel");

const getAllServices = async function (req, res) {
  try {
    const services = await Service.find();

    if (!services || services.length === 0)
      throw new Error("Services not avaiable!");

    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getService = async function (req, res) {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) throw new Error("Services not avaiable!");

    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createService = async function (req, res) {
  try {
    const service = await Service.create(req.body);

    res.status(200).json({ service, message: "Service creatted succefully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateService = async function (req, res) {
  try {
    const { id } = req.params;

    await Service.findByIdAndUpdate(id, req.body, { runValidators: true });

    const service = await Service.findById(id);

    res.status(200).json({ service, message: "Service updated succefully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteService = async function (req, res) {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    res.status(200).json({ service, message: "Service deleted  succefully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
};
