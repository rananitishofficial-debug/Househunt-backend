import express from "express";
import Property from "../models/Property.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const data = new Property(req.body);
  const saved = await data.save();
  res.json(saved);
});

router.get("/", async (req, res) => {
  const list = await Property.find();
  res.json(list);
});

export default router;