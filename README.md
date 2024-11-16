
# Assignment Submission Portal

## Overview

This project is a backend system for an Assignment Submission Portal. It allows users and admins to interact as follows:
- **Users** can:
  - Register and log in.
  - Upload assignments.
  - View available admins.
- **Admins** can:
  - Register and log in.
  - View assignments tagged to them.
  - Accept or reject assignments.

The system is built using Node.js, Express, and MongoDB.

---

## Features

### User Features
- **Register**: Create a new user account.
- **Login**: Authenticate and receive a token.
- **Upload Assignment**: Submit an assignment for review.
- **View Admins**: See a list of all available admins.

### Admin Features
- **Register**: Create a new admin account.
- **Login**: Authenticate and receive a token.
- **View Assignments**: Get all assignments tagged to the admin.
- **Accept or Reject Assignments**: Change the status of assignments.

---

## Installation and Setup

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/SagarBhoi404/assignment-submission-portal.git
   cd assignment-submission-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add the following:
   ```
   MONGO_URI=mongodb://localhost:27017/assignmentPortal
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. Start the application:
   ```bash
   npm start
   ```

---

## API Endpoints

### User Endpoints
1. **Register**
   - `POST /api/users/register`
   - Body:
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123",
       "role": "User"
     }
     ```
2. **Login**
   - `POST /api/users/login`
   - Body:
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```
3. **Upload Assignment**
   - `POST /api/users/upload`
   - Headers:
     ```json
     {
       "Authorization": "Bearer <your_token>"
     }
     ```
   - Body:
     ```json
     {
       "task": "Complete Math Homework",
       "admin": "admin_id_here"
     }
     ```
4. **View Admins**
   - `GET /api/users/admins`
   - Headers:
     ```json
     {
       "Authorization": "Bearer <your_token>"
     }
     ```

### Admin Endpoints
1. **Register**
   - `POST /api/admins/register`
   - Body:
     ```json
     {
       "name": "Admin User",
       "email": "admin@example.com",
       "password": "adminpassword",
       "role": "Admin"
     }
     ```
2. **Login**
   - `POST /api/admins/login`
   - Body:
     ```json
     {
       "email": "admin@example.com",
       "password": "adminpassword"
     }
     ```
3. **View Assignments**
   - `GET /api/admins/assignments`
   - Headers:
     ```json
     {
       "Authorization": "Bearer <your_token>"
     }
     ```
4. **Accept Assignment**
   - `POST /api/admins/assignments/:id/accept`
   - Headers:
     ```json
     {
       "Authorization": "Bearer <your_token>"
     }
     ```
5. **Reject Assignment**
   - `POST /api/admins/assignments/:id/reject`
   - Headers:
     ```json
     {
       "Authorization": "Bearer <your_token>"
     }
     ```

---

