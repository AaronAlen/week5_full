import express from "express";
import { getStudents, getStudentById, createStudent, updateStudent, patchStudent, deleteStudent } from "../controllers/studentController.js";
import { validateFullStudent, validatePartialStudent } from "../middleware/studentValidation.js";

const router = express.Router();

router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/", validateFullStudent, createStudent);
router.put("/:id", validateFullStudent, updateStudent);
router.patch("/:id", validatePartialStudent, patchStudent);
router.delete("/:id", deleteStudent);

export default router;
