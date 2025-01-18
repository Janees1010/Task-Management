Task Management System

A simple Task Management System built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This system includes basic user authentication, task management (CRUD), and a responsive dashboard.
Features
Backend (Node.js & Express)

    JWT-based Authentication: Secure user login and registration.
    Password Encryption: Uses bcrypt for hashing user passwords.
    Task Management: CRUD operations for tasks.
    Task Features: Priority, Due date, Status tracking (Pending, In Progress, Completed).
    Error Handling & Validation: Basic error handling on all API endpoints.

Frontend (React)

    User Registration & Login: Basic forms for user authentication.
    Task Dashboard: Display all tasks with filters by priority, category, and due date.
    Responsive Design: The interface adapts for both mobile and desktop views.

Technologies Used

    MongoDB: For storing user and task data.
    Express.js: For creating RESTful APIs.
    React.js: For building the user interface.
    Node.js: For server-side logic.
    JWT: For user authentication.
    bcrypt: For password hashing.
    Axios: For making HTTP requests from the frontend to the backend.

Installation
Backend Setup

    Clone the repository:

git clone <repository-url>

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Create a .env file in the backend directory and add the following environment variables:

SECRET_KEY=your-secret-key
DB_URL=your-mongo-db-connection-string

    SECRET_KEY: Used for signing JWT tokens (choose your secret key).
    DB_URL: The URL of your MongoDB database (e.g., mongodb://localhost:27017/taskmanagement).

Start the backend server:

    npm start

    The backend should now be running at http://localhost:5000.

Frontend Setup

    Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the frontend development server:

npm run dev
