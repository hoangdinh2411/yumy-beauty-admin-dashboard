import categoryMessage from "../modules/categoryMessage.js";
import mongoose from "mongoose";
import serviceMessage from "../modules/serviceMessage.js";
const categoryController = {
  create: async (req, res) => {
    const { createdBy, name } = req.body;

    const newCategory = new categoryMessage({
      name,
      createdBy: createdBy,
      createdAt: new Date().toISOString(),
    });
    try {
      //kiem tra bang id , neu co thi chung to da khoi tao
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res
        .status(500)
        .json({ message: { error: "Something went wrong! Try again later" } });
    }
  },
  getCategories: async (req, res) => {
    try {
      const categories = await categoryMessage.find();
      // neu ko co du lieu gi, return luon
      res.status(201).json(categories);
    } catch (error) {
      res
        .status(500)
        .json({ message: { error: "Something went wrong! Try again later" } });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { updatedBy, name } = req.body;

    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res
          .status(404)
          .json({ message: { error: "Cannot edit this category" } });

      await categoryMessage.findByIdAndUpdate(
        id,
        {
          _id: id,
          name,
          updatedBy: updatedBy,
          updatedAt: new Date().toISOString(),
        },
        { new: true }
      );

      res.status(201).json({ message: { success: "update success" } });
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
        return res.status(400).json({
          message: { error: "cannot delete this category. Try again later" },
        });

      const services = serviceMessage.find({ category: id });
      if (!services)
        return res.status(404).json({
          message: { error: "cannot delete this category. Try again later" },
        });
      await services.deleteMany()
      await categoryMessage.findByIdAndRemove(id);
      res.status(201).json("Deleted");
    } catch (error) {
      res
        .status(500)
        .json({ message: { error: "Something went wrong! Try again later" } });
    }
  },
};

export default categoryController;
