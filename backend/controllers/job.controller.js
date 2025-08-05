import express from "express";
import { Job } from "../models/job.model";

const jobController = express.Router();

jobController.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("company").populate("created_by");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

jobController.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("company").populate("created_by");
    res.json(job);
  } catch (error) {
    res.status(404).json({ message: "Job not found" });
  }
});

jobController.post("/", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Error creating job" });
  }
});

jobController.put("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (error) {
    res.status(404).json({ message: "Job not found" });
  }
});

jobController.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndRemove(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Job not found" });
  }
});

export default jobController;