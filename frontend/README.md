Class Attendance Log

A full-stack web application for managing student information and recording class attendance. The system allows teachers or administrators to manage students, record attendance, and view attendance information through a simple web interface.

Features

Teacher/Admin login

Dashboard with attendance statistics

Add students

View student list

Edit student information

Delete students

Record student attendance

Attendance statuses:

Present

Absent

Late

Excused

View attendance records

Attendance percentage and summaries

MongoDB database storage

REST API using Node.js and Express

Technologies Used
Frontend

React

Vite

React Router

Axios

HTML

CSS

JavaScript

Backend

Node.js

Express.js

Mongoose

JSON Web Token

bcryptjs

CORS

dotenv

Database

MongoDB

MongoDB Compass

Project Structure
Class Attendance Class/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── .gitignore
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   │   ├── User.js
│   │   ├── Student.js
│   │   └── Attendance.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   └── attendanceRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
└── README.md

System Architecture

The application follows a three-layer architecture:

┌───────────────────────────┐
│        React Frontend     │
│                           │
│  Dashboard                │
│  Students                 │
│  Attendance               │
│  Login                    │
└─────────────┬─────────────┘
              │
              │ HTTP / REST API
              │
┌─────────────▼─────────────┐
│    Node.js + Express      │
│                           │
│  Authentication           │
│  Student API              │
│  Attendance API            │
└─────────────┬─────────────┘
              │
              │ Mongoose
              │
┌─────────────▼─────────────┐
│         MongoDB           │
│                           │
│  Users                    │
│  Students                 │
│  Attendance               │
└───────────────────────────┘

Database Collections
Users

Stores teacher and administrator accounts.

Example:

{
  "name": "John Teacher",
  "email": "teacher@example.com",
  "password": "hashed-password",
  "role": "teacher"
}

Students

Stores student information.

Example:

{
  "studentId": "2026-001",
  "firstName": "Juan",
  "lastName": "Dela Cruz",
  "email": "juan@example.com",
  "course": "BSIT",
  "yearLevel": 2
}

Attendance

Stores attendance records for each student.

Example:

{
  "student": "student_id",
  "date": "2026-10-05",
  "status": "Present",
  "remarks": ""
}

Requirements

Before running the application, install:

Node.js

npm

MongoDB

MongoDB Compass

Visual Studio Code

Git

Installation
1. Clone the repository
git clone https://github.com/YOUR_USERNAME/class-attendance-log.git


Replace YOUR_USERNAME with your GitHub username.

Then enter the project folder:

cd class-attendance-log

2. Install Frontend Dependencies

Go to the frontend directory:

cd frontend


Install the dependencies:

npm install

3. Install Backend Dependencies

Open another terminal and go to the backend:

cd backend


Install the dependencies:

npm install

4. Configure MongoDB

Make sure your local MongoDB server is running.

You can use MongoDB Compass to connect to:

mongodb://localhost:27017


The application uses the following database:

classAttendance

5. Create the Environment File

Inside the backend folder, create:

.env


Add:

PORT=5000
MONGO_URI=mongodb://localhost:27017/classAttendance
JWT_SECRET=your_secret_key

Important

Do not upload .env to GitHub.

The .env file contains private configuration information and should be included in .gitignore.

Running the Application

The frontend and backend need to run separately.

Start the Backend

From the backend directory:

npm run dev


The backend should run on:

http://localhost:5000


You should see:

MongoDB connected
Server running on port 5000

Start the Frontend

Open another terminal and go to:

cd frontend


Run:

npm run dev


The React application should be available at:

http://localhost:5173


Open that address in your browser.

API Endpoints
Students
Method	Endpoint	Description
GET	/api/students	Get all students
GET	/api/students/:id	Get one student
POST	/api/students	Add a student
PUT	/api/students/:id	Update a student
DELETE	/api/students/:id	Delete a student
Attendance
Method	Endpoint	Description
GET	/api/attendance	Get attendance records
POST	/api/attendance	Add attendance
PUT	/api/attendance/:id	Update attendance
DELETE	/api/attendance/:id	Delete attendance
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a user
POST	/api/auth/login	Login a user
Attendance Calculation

The attendance percentage can be calculated using:

Attendance Percentage =
(Number of Present Classes / Total Classes) × 100


For example:

Present = 18
Absent = 2
Late = 1

Total Classes = 21

Attendance Percentage =
18 / 21 × 100

= 85.71%

Security

The application uses:

Password hashing with bcryptjs

JWT-based authentication

Environment variables for sensitive configuration

CORS configuration

MongoDB database validation

Sensitive information such as database credentials and JWT secrets should never be committed to GitHub.

Development

To create a new feature:

Create or modify the appropriate React component.

Create the required Express route.

Create or update the controller.

Update the MongoDB model if necessary.

Test the API.

Test the frontend.

Commit the changes to Git.

Example:

git add .
git commit -m "Added attendance management"
git push

Future Improvements

Possible future improvements include:

Teacher account management

Admin dashboard

Class/section management

Subject management

Multiple teachers

Attendance reports

Export attendance to Excel/PDF

Search and filter students

Monthly attendance reports

Email notifications

Responsive mobile interface

Deployment to a cloud platform

Project Purpose

The Class Attendance Log was developed as a full-stack web application to demonstrate the use of modern web development technologies, including React, Node.js, Express, and MongoDB.

The system is designed to make classroom attendance recording easier, more organized, and accessible through a web-based interface.

Author

Class Attendance Log

Developed as a full-stack web application project.

License

This project is for educational and development purposes.


Save that as:

```text
README.md


in the main project folder, alongside frontend and backend.

Then push it to GitHub with:

git add README.md
git commit -m "Added project README"
git push


