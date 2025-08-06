import express from "express";
import { 
  getAllJobs, 
  getJobById, 
  postJob, 
  putJob, 
  deleteJob 
} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Public routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Protected routes (require authentication)
router.post("/", isAuthenticated, postJob);
router.put("/:id", isAuthenticated, putJob);
router.delete("/:id", isAuthenticated, deleteJob);

export default router;