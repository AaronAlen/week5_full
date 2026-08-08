import fs from "fs";
import Student from "../models/Student.js";

const logDirectory = "./logs";

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory,  { recursive: true });
}



const writeActivityLog = (message) => {
  const logEntry = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFile("./logs/activity.log", logEntry, (error) => {
    if (error) {
      console.error("Failed to write activity log:", error.message);
    }
  });
};

const getStudents = async (req, res) => {
  const students = await Student.find();

  res.status(200).json({
    success: true,
    message: "Students fetched successfully",
    data: students,
  });
};





const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Student fetched successfully",
    data: student,
  });
};





const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  writeActivityLog(`Student created: ${student.name} (${student.email})`);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: student,
  });
};





const updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  writeActivityLog(`Student updated: ${student.name} (${student.email})`);

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student,
  });
};





const patchStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  writeActivityLog(`Student partially updated: ${student.name} (${student.email})`);

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student,
  });
};





const deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  writeActivityLog(`Student deleted: ${student.name} (${student.email})`);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: student,
  });
};





export { getStudents, getStudentById, createStudent, updateStudent, patchStudent, deleteStudent };
