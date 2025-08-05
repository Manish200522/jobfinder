import express from "express";
import { getAllJobs, getJobById, postJob, putJob, deleteJob } from "../controllers/job.controller.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", postJob);
router.put("/:id", putJob);
router.delete("/:id", deleteJob);

export default router;

