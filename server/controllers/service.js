import serviceMessage from "../modules/serviceMessage.js";
import mongoose from "mongoose";
const serviceController = {
  addNewService: async (req, res) => {
    const formData = req.body;
    const newService = new serviceMessage({
      ...formData,
      createdAt: new Date().toISOString(),
    });
    try {
      await newService.save();
      res.status(201).json(newService);
    } catch (error) {
      res
        .status(500)
        .json({ message: { error: "Something went wrong! Try again later" } });
    }
  },
  getServices: async (req, res) => {
    try {
      const services = await serviceMessage.find();
      res.status(201).json(services);
    } catch (error) {
      res
        .status(500)
        .json({ message: { error: "Something went wrong! Try again later" } });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res
          .status(404)
          .json({ message: { error: "Cannot delete this service" } });

      await serviceMessage.findByIdAndRemove(id);
      res.json({ message: { success: "delete success" } });
    } catch (error) {
      res
        .status(500)
        .json({ message: { error: "Something went wrong! Try again later" } });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const service = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res
          .status(404)
          .json({ message: { error: "Cannot update this service" } });

      await serviceMessage.findByIdAndUpdate(
        id,
        { ...service, _id: id, updatedAt: new Date().toISOString() },
        { new: true }
      );
      res.json({ message: { success: "Update success" } });
    } catch (error) {
      res
        .status(500)
        .json({ message: { error: "Something went wrong! Try again later" } });
    }
  },
};

export default serviceController;
