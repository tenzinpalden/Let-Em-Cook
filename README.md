Let 'Em Cook

Let 'Em Cook is a recipe-sharing platform designed to help college students create simple and affordable meals. Users can view, upload, and share recipes. The project consists of a React frontend and a Flask backend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup (Flask)](#2-backend-setup-flask)
  - [3. Frontend Setup (React)](#3-frontend-setup-react)
- [Running the Application](#running-the-application)
  - [Starting the Backend](#starting-the-backend)
  - [Starting the Frontend](#starting-the-frontend)
  - [Running Both with `npm run dev`](#running-both-with-npm-run-dev)
- [File Structure](#file-structure)
- [Troubleshooting](#troubleshooting)

## Features

- Browse a list of recipes with images, cook time, and estimated price.
- Filter recipes by dietary preferences.
- Mark favorite recipes.
- Backend API to manage and serve recipes.

## Tech Stack

- Frontend: React
- Backend: Flask (Python)
- Additional Libraries:
  - Flask-CORS for cross-origin resource sharing
  - `concurrently` for running frontend and backend together

## Setup

### 1. Clone the Repository

Start by cloning the project to your local machine:

```bash
git clone https://github.com/your-username/let-em-cook.git
cd let-em-cook

cd backend
pip install -r requirements.txt

cd ../letemcook
npm install

npm install concurrently --save-dev

TO RUN:
npm run dev



