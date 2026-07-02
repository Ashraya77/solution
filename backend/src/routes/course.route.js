import { Router } from "express";
import {
  addCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controllers/courses.controller.js";
import { requireAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", requireAdmin, addCourse);
router.post("/addCourse", requireAdmin, addCourse);
router.patch("/:id", requireAdmin, updateCourse);
router.delete("/:id", requireAdmin, deleteCourse);

export default router;
