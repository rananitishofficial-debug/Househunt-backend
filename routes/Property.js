import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  furnished: Boolean,
  description: String,
});

export default mongoose.model("Property", propertySchema);
