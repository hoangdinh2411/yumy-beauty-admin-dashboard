import staffsMessage from "../modules/staffsMessage.js";
import serviceMessage from "../modules/serviceMessage.js";

import mongoose from "mongoose";
const staffsController = {
  getAll: async (req, res) => {
    try {
      const staffs = await staffsMessage.find();
      res.status(201).json(staffs);
    } catch (error) {
      res
        .status(500)
        .json({ message: { error: "Something went wrong! Try again later" } });
    }
  },
  create: async (req, res) => {
    const formData = req.body;
    const { email } = formData;
    const newStaff = new staffsMessage({
      ...formData,
      createdAt: new Date().toISOString(),
    });
    try {
      const existingStaff = await staffsMessage.findOne({ email });
      if (existingStaff)
        return res
          .status(400)
          .json({ message: { error: "The email already exists" } });

      await newStaff.save();
      res.status(201).json(newStaff);
    } catch (error) {
      res
        .status(500)
        .json({ message: { error: "Something went wrong! Try again later" } });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const formData = req.body;
    const { email } = formData;
    try {
      const currentStaff = await staffsMessage.findById({ _id: id });
      if (currentStaff.email !== email) {
        const existingStaff = await staffsMessage.findOne({ email });
        if (existingStaff)
          return res
            .status(400)
            .json({ message: { error: "The email already exists" } });
      }

      await staffsMessage.findByIdAndUpdate(
        id,
        {
          ...formData,
          _id: id,
          updatedAt: new Date().toISOString(),
        },
        { new: true }
      );

      res.status(201).json("update success");
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
          message: { error: "cannot delete this staff. Try again later" },
        });

        // Find services that have staffs who is going delete , update services, delete staffs id on staff field.
      await serviceMessage.find({ staffs: id }).update(
        // Filters
        {},
        //pull : delete 1 staff id on staffs array
        {
          $pull: {
            staffs: id,
          },
        },

        //update for all services 
        {multi:true}
      );
      await staffsMessage.findByIdAndRemove(id);
      res.status(201).json("Deleted success");
    } catch (error) {
      res
        .status(500)
        .json({ message: { error: "Something went wrong! Try again later" } });
    }
  },
};

export default staffsController;
