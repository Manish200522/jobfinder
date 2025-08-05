import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cloudinary from "./utils/cloudinary.js";
import jobController from "./controllers/job.controller";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/jobs", jobController);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});