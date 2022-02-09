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
    const { id,name, code, percentage, startDate, endDate,createdBy } = req.body;
    const newCoupon = new couponsMessage({
      id,
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
      await newCoupon.save();
      res.status(201).json(newCoupon);
    } catch (error) {
      res
        .status(500)
        .json({ message: { error: "Something went wrong! Try again later" } });
    }
  },
  update: (req, res) => {},
  delete: (req, res) => {},
};

export default couponsController;
