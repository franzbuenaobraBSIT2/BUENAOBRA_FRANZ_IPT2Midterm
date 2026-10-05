import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate
} from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

const API_URL = "http://localhost:5000/api";

// ============================
// Dashboard
// ============================

function Dashboard() {
    const [studentCount, setStudentCount] = useState(0);

    useEffect(() => {
        axios
            .get(`${API_URL}/students`)
            .then((response) => {
                setStudentCount(response.data.length);
            })
            .catch((error) => {
                console.error("Failed to load students:", error);
            });
    }, []);

    return (
        <div className="page">
            <h1>Dashboard</h1>

            <p>
                Welcome to Class Attendance Log.
            </p>

            <div className="dashboard-cards">

                <div className="card">
                    <h3>Total Students</h3>
                    <p>{studentCount}</p>
                </div>

                <div className="card">
                    <h3>Present Today</h3>
                    <p>0</p>
                </div>

                <div className="card">
                    <h3>Absent Today</h3>
                    <p>0</p>
                </div>

                <div className="card">
                    <h3>Late Today</h3>
                    <p>0</p>
                </div>

            </div>
        </div>
    );
}

// ============================
// Students
// ============================

function Students() {

    const [students, setStudents] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        studentId: "",
        firstName: "",
        lastName: "",
        email: "",
        course: "",
        yearLevel: ""
    });

    const [message, setMessage] = useState("");

    // Load students
    const loadStudents = async () => {

        try {

            const response = await axios.get(
                `${API_URL}/students`
            );

            setStudents(response.data);

        } catch (error) {

            console.error(
                "Failed to load students:",
                error
            );

        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    // Handle input
    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };

    // Add student
    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("");

        try {

            await axios.post(
                `${API_URL}/students`,
                {
                    ...formData,
                    yearLevel: Number(formData.yearLevel)
                }
            );

            setMessage(
                "Student added successfully!"
            );

            setFormData({
                studentId: "",
                firstName: "",
                lastName: "",
                email: "",
                course: "",
                yearLevel: ""
            });

            setShowForm(false);

            loadStudents();

        } catch (error) {

            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to add student."
            );
        }
    };

    // Delete student
    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await axios.delete(
                `${API_URL}/students/${id}`
            );

            loadStudents();

        } catch (error) {

            console.error(
                "Failed to delete student:",
                error
            );

        }
    };

    return (
        <div className="page">

            <div className="page-header">

                <div>
                    <h1>Students</h1>

                    <p>
                        Manage your students.
                    </p>
                </div>

                <button
                    className="primary-button"
                    onClick={() =>
                        setShowForm(!showForm)
                    }
                >
                    {showForm
                        ? "Cancel"
                        : "+ Add Student"}
                </button>

            </div>

            {message && (
                <div className="message">
                    {message}
                </div>
            )}

            {/* Add Student Form */}

            {showForm && (

                <div className="form-card">

                    <h2>Add Student</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>
                                    Student ID *
                                </label>

                                <input
                                    type="text"
                                    name="studentId"
                                    value={
                                        formData.studentId
                                    }
                                    onChange={handleChange}
                                    placeholder="2026-001"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    First Name *
                                </label>

                                <input
                                    type="text"
                                    name="firstName"
                                    value={
                                        formData.firstName
                                    }
                                    onChange={handleChange}
                                    placeholder="Juan"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Last Name *
                                </label>

                                <input
                                    type="text"
                                    name="lastName"
                                    value={
                                        formData.lastName
                                    }
                                    onChange={handleChange}
                                    placeholder="Dela Cruz"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={
                                        formData.email
                                    }
                                    onChange={handleChange}
                                    placeholder="student@example.com"
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Course
                                </label>

                                <input
                                    type="text"
                                    name="course"
                                    value={
                                        formData.course
                                    }
                                    onChange={handleChange}
                                    placeholder="BSIT"
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Year Level
                                </label>

                                <select
                                    name="yearLevel"
                                    value={
                                        formData.yearLevel
                                    }
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Year
                                    </option>

                                    <option value="1">
                                        1st Year
                                    </option>

                                    <option value="2">
                                        2nd Year
                                    </option>

                                    <option value="3">
                                        3rd Year
                                    </option>

                                    <option value="4">
                                        4th Year
                                    </option>

                                </select>

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="primary-button"
                        >
                            Save Student
                        </button>

                    </form>

                </div>
            )}

            {/* Student Table */}

            <div className="table-container">

                <table>

                    <thead>

                        <tr>

                            <th>
                                Student ID
                            </th>

                            <th>
                                Name
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                Course
                            </th>

                            <th>
                                Year
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {students.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    style={{
                                        textAlign: "center"
                                    }}
                                >
                                    No students found.
                                </td>

                            </tr>

                        ) : (

                            students.map((student) => (

                                <tr key={student._id}>

                                    <td>
                                        {student.studentId}
                                    </td>

                                    <td>
                                        {student.firstName}{" "}
                                        {student.lastName}
                                    </td>

                                    <td>
                                        {student.email || "-"}
                                    </td>

                                    <td>
                                        {student.course || "-"}
                                    </td>

                                    <td>
                                        {student.yearLevel || "-"}
                                    </td>

                                    <td>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(
                                                    student._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

// ============================
// Attendance
// ============================

function Attendance() {

    return (

        <div className="page">

            <h1>Attendance</h1>

            <div className="attendance-header">

                <label>

                    Date:

                    <input
                        type="date"
                    />

                </label>

            </div>

            <div className="table-container">

                <table>

                    <thead>

                        <tr>

                            <th>
                                Student ID
                            </th>

                            <th>
                                Student Name
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Remarks
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td
                                colSpan="4"
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                Attendance system will be
                                connected next.
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

            <button className="primary-button">
                Save Attendance
            </button>

        </div>
    );
}

// ============================
// Login
// ============================

function Login() {

    return (

        <div className="login-container">

            <div className="login-card">

                <h1>
                    Class Attendance Log
                </h1>

                <p className="login-subtitle">
                    Teacher Login
                </p>

                <form>

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                        />

                    </div>

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

// ============================
// Layout
// ============================

function Layout() {

    return (

        <div className="app-container">

            <aside className="sidebar">

                <div className="logo">

                    <h2>
                        Class Attendance
                    </h2>

                    <span>
                        Log
                    </span>

                </div>

                <nav>

                    <Link to="/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/students">
                        Students
                    </Link>

                    <Link to="/attendance">
                        Attendance
                    </Link>

                </nav>

                <div className="sidebar-bottom">

                    <Link to="/login">
                        Logout
                    </Link>

                </div>

            </aside>

            <main className="main-content">

                <Routes>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/students"
                        element={<Students />}
                    />

                    <Route
                        path="/attendance"
                        element={<Attendance />}
                    />

                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/dashboard"
                                replace
                            />
                        }
                    />

                </Routes>

            </main>

        </div>
    );
}

// ============================
// App
// ============================

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/*"
                    element={<Layout />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
