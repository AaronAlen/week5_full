# Student Management REST API

This is a beginner-level backend project built with Node.js, Express.js, MongoDB, and Mongoose.

The API can create, read, update, partially update, and delete student records. Each student has a name, email, age, and course.

## Folder Structure

```text
project/
|-- src/
|   |-- config/
|   |   `-- db.js
|   |-- controllers/
|   |   `-- studentController.js
|   |-- middleware/
|   |   |-- logger.js
|   |   |-- notFound.js
|   |   |-- errorHandler.js
|   |   `-- studentValidation.js
|   |-- models/
|   |   `-- Student.js
|   `-- routes/
|       `-- studentRoutes.js
|-- logs/
|   `-- activity.log
|-- .env
|-- server.js
|-- package.json
`-- README.md
```

## Installation

Install the project dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

The server runs on:

```text
http://localhost:5000
```

## Required npm Packages

- express
- mongoose
- dotenv
- cors
- helmet
- joi
- express-async-errors

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/student_management
```

## MongoDB Setup

Make sure MongoDB is installed and running on your computer.

This project uses the following local MongoDB database:

```text
student_management
```

Mongoose will create the students collection after the first student is saved.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get one student by ID |
| POST | `/students` | Create a new student |
| PUT | `/students/:id` | Update a full student record |
| PATCH | `/students/:id` | Update part of a student record |
| DELETE | `/students/:id` | Delete a student |

## Sample Request Body

Use this JSON body for `POST /students` or `PUT /students/:id`:

```json
{
  "name": "Ananya Sharma",
  "email": "ananya@example.com",
  "age": 21,
  "course": "Node.js"
}
```

Use this JSON body for `PATCH /students/:id`:

```json
{
  "course": "Express.js"
}
```

## Sample Success Response

```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "_id": "66a111111111111111111111",
    "name": "Ananya Sharma",
    "email": "ananya@example.com",
    "age": 21,
    "course": "Node.js",
    "createdAt": "2026-08-07T10:00:00.000Z",
    "updatedAt": "2026-08-07T10:00:00.000Z"
  }
}
```

## Sample Validation Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name is required",
    "Email must be valid"
  ]
}
```

## Sample Not Found Response

```json
{
  "success": false,
  "message": "Student not found"
}
```

## Activity Log

Whenever a student is created, updated, partially updated, or deleted, a simple log entry is added to:

```text
logs/activity.log
```
