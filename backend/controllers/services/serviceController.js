const Service = require("../../models/serviceModel");

const getAllServices = async function (req, res) {
  try {
    const services = await Service.find({ active: true });

    if (!services) throw new Error("Services not avaiable!");

    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getService = async function (req, res) {
  try {
    const { id } = req.params;

    const service = await Service.find({ _id: id, active: true });

    if (!service) throw new Error("Services not avaiable!");

    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createService = async function (req, res) {
  try {
    const { serviceType, serviceLocation, phoneNumber } = req.body;

    const service = await Service.create({
      serviceType,
      serviceLocation,
      phoneNumber,
    });

    res.status(200).json({ service, message: "Service creatted succefully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateService = async function (req, res) {
  try {
    const { serviceType, serviceLocation, phoneNumber } = req.body;

    const { id } = req.params;

    await Service.findByIdAndUpdate(
      id,
      {
        serviceType,
        serviceLocation,
        phoneNumber,
      },
      { runValidators: true }
    );

    const service = await Service.findById(id);

    res.status(200).json({ service, message: "Service creatted succefully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteService = async function (req, res) {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndUpdate(id, {
      active: false,
    });

    res.status(200).json({ service, message: "Service creatted succefully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const getAllDeletedServices = async function (req, res) {
//   try {
//     const services = await Service.find({
//       active: false,
//     });

//     res.status(200).json({ services });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

module.exports = {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
};
