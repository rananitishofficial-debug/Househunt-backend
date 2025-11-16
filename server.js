import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import propertyRoutes from "./routes/propertyRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();
console.log("MONGO_URI VALUE=", process.env.MONGO_URI);
app.use("/api/properties", propertyRoutes);

const PORT = process.env.PORT ||5000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));
