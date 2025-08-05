import express from "express";
import { Job } from "../models/job.model.js";

const jobController = express.Router();

export async function getAllJobs(req, res) {
  try {
    const keyword = req.query.keyword || "";
    const query = keyword
      ? { title: { $regex: keyword, $options: "i" } }
      : {};
    const jobs = await Job.find(query).populate("company").populate("created_by");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
}

export async function getJobById(req, res) {
  try {
    const job = await Job.findById(req.params.id).populate("company").populate("created_by");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(404).json({ message: "Job not found" });
  }
}

export async function postJob(req, res) {
  try {
    const job = new Job(req.body);
    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Error creating job" });
  }
}

export async function putJob(req, res) {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(404).json({ message: "Job not found" });
  }
}

export async function deleteJob(req, res) {
  try {
    const job = await Job.findByIdAndRemove(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Job not found" });
  }
}

export default jobController;