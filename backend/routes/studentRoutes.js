const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// GET all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find().sort({
            createdAt: -1
        });

        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get students",
            error: error.message
        });
    }
});

// GET one student
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get student",
            error: error.message
        });
    }
});

// CREATE student
router.post("/", async (req, res) => {
    try {
        const {
            studentId,
            firstName,
            lastName,
            email,
            course,
            yearLevel
        } = req.body;

        if (!studentId || !firstName || !lastName) {
            return res.status(400).json({
                message: "Student ID, first name, and last name are required"
            });
        }

        const existingStudent = await Student.findOne({
            studentId
        });

        if (existingStudent) {
            return res.status(400).json({
                message: "Student ID already exists"
            });
        }

        const student = await Student.create({
            studentId,
            firstName,
            lastName,
            email,
            course,
            yearLevel
        });

        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create student",
            error: error.message
        });
    }
});

// UPDATE student
router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update student",
            error: error.message
        });
    }
});

// DELETE student
router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete student",
            error: error.message
        });
    }
});

module.exports = router;
