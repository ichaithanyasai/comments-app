# Real-Time Comments System

This project is a Real-Time Comment System built with Next.js for the frontend, Node.js with TypeScript for the backend, MySQL for data storage, and Socket.IO for real-time communication. It uses Material UI (MUI) for the user interface.

## Overview

This real-time comment system allows users to log in, post comments, and view new comments in real time across all clients. The application integrates Socket.IO for real-time functionality, with MySQL used for persistent storage.

### Features
- Real-Time Comment Posting: Users can post comments and see new comments instantly.
- User Authentication: Basic login functionality with session IDs.
- MySQL Integration: Comments are stored and retrieved from a MySQL database.
- Responsive Frontend: The frontend is styled using Material UI (MUI) to provide a modern, responsive user interface.

### Tech Stack

   - Frontend: Next.js, Axios, Material UI (MUI)
- Backend: Node.js, Express, TypeScript, Socket.IO
- Database: MySQL

### Installation

Follow these steps to set up the project locally.
Frontend Setup

Navigate to the frontend directory:

    cd frontend

Install the required dependencies:

    npm install

Start the development server:

    npm run dev

The frontend will be accessible at 

    http://localhost:3000.

Backend Setup

Open a new terminal and navigate to the backend directory:

    cd backend

Install the necessary dependencies:

    npm install

Create a .env file in the backend directory with the following content:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=comments_database
    JWT_SECRET=your_jwt_secret

Start the backend server:

Using nodemon for auto-reloading

     npx nodemon src/app.js


By default, the backend will run on http://localhost:5000.

Database Setup

- Ensure MySQL is installed and running on your machine.

- Log in to MySQL:

      mysql -u root -p

Create the necessary database and tables:

    CREATE DATABASE IF NOT EXISTS comments_database;
    USE comments_database;
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      comment TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    );

  Ensure the .env file in the backend directory is updated with the correct MySQL credentials.

  Start the backend server and ensure the connection to MySQL is successful.

Running the Application

- To run the application locally, follow these steps:

  Frontend:

   Navigate to the frontend directory and run:

       cd frontend
       npm install
       npm run dev

Backend:

Navigate to the backend directory and run:

    cd backend
    npm install
    npx nodemon src/index.ts

Prerequisites

  - MySQL must be installed and running on your local machine.
  - The .env file in the backend directory must be properly configured with valid MySQL credentials and a JWT secret.


<p align="center">
  <img src="https://github.com/ichaithanyasai/comments-app/blob/main/registerpage-darkmode.png" width="550" title="hover text"><br>
  <img src="https://github.com/ichaithanyasai/comments-app/blob/main/index.png" width="550" alt="accessibility text"><br>
    <img src="https://github.com/ichaithanyasai/comments-app/blob/main/Sign-in-page-light-mode.png" width="550" title="hover text"><br>
  <img src="https://github.com/ichaithanyasai/comments-app/blob/main/SIgininpage-darkmode.png" width="550" alt="accessibility text"><br>
    <img src="https://github.com/ichaithanyasai/comments-app/blob/main/Register-page-light-mode.png" width="550" title="hover text">
   
</p>

