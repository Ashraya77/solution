import { Router } from "express";
import {
  acceptInquiry,
  createInquiry,
  deleteInquiry,
  getInquiries,
  getInquiry,
  rejectInquiry,
  updateInquiry,
} from "../controllers/inquiry.controller.js";
import { requireAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", createInquiry);
router.get("/", requireAdmin, getInquiries);
router.get("/:id", requireAdmin, getInquiry);
router.patch("/:id", requireAdmin, updateInquiry);
router.delete("/:id", requireAdmin, deleteInquiry);
router.patch("/:id/reject", requireAdmin, rejectInquiry);
router.patch("/:id/accept", requireAdmin, acceptInquiry);

export default router;
