const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const studentRoutes = require("./routes/studentRoutes");

app.use("/api/students", studentRoutes);


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Class Attendance Log API is running"
    });
});

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });
