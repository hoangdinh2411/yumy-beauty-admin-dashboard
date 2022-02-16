import couponsMessage from "../modules/couponsMessage.js";
import mongoose from "mongoose";
const couponsController = {
  getAll: async (req, res) => {
    try {
      const coupons = await couponsMessage.find();
      // neu ko co du lieu gi, return luon
      res.status(201).json(coupons);
    } catch (error) {
      res
        .status(500)
        .json({ message: { error: "Something went wrong! Try again later" } });
    }
  },
  create: async (req, res) => {
    const { name, code, percentage, startDate, endDate, createdBy } = req.body;
    const newCoupon = new couponsMessage({
      name,
      code,
      percentage,
      startDate,
      endDate,
      createdBy,
      createdAt: new Date().toISOString(),
    });
    try {
      //kiem tra bang id , neu co thi chung to da khoi tao
      const existingCoupon = couponsMessage.find({ code });
      if (existingCoupon)
        return res.status(400).json({
          message: { error: "The coupon already exists" },
        });
      await newCoupon.save();
      res.status(201).json(newCoupon);
    } catch (error) {
      res
        .status(500)
        .json({ message: { error: "Something went wrong! Try again later" } });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { name, code, percentage, updatedBy, startDate, endDate } = req.body;

    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res
          .status(404)
          .json({ message: { error: "Cannot update the coupon" } });

      await couponsMessage.findByIdAndUpdate(
        id,
        {
          _id: id,
          name,
          code,
          percentage,
          updatedBy,
          startDate,
          endDate,
          updatedAt: new Date().toISOString(),
        },
        { new: true }
      );
      return res.status(201).json("Updated success");
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
          .json({ message: { error: "Cannot delete the coupon" } });

      await couponsMessage.findByIdAndRemove(id);
      return res.status(201).json("Delete success");
    } catch (error) {
      res
        .status(500)
        .json({ message: { error: "Something went wrong! Try again later" } });
    }
  },
};

export default couponsController;
