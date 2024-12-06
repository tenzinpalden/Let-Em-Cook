# Let 'Em Cook

Let 'Em Cook is a recipe-sharing platform designed to help college students create simple and affordable meals. 
Users can view, upload, and share recipes. The project consists of a React frontend and a Flask backend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)

## Features

- Browse a list of recipes with images, cook time, and estimated price.
- Filter recipes by dietary preferences.
- Mark favorite recipes.
- Create and upload user-generated recipes.
- Search functionality to find recipes to your liking.
- Backend API to manage and serve recipes.

## Tech Stack

- Frontend: React
- Backend: Flask (Python)
- Additional Libraries:
  - Flask-CORS for cross-origin resource sharing
  - `concurrently` for running frontend and backend together

## Setup

### Prerequisites

Before setting up the project, make sure you have the following installed on your system:

1. Python 3.6+
   - Check if Python is installed:
     python --version
   - If not installed, download it here:
     https://www.python.org/downloads/

2. Node.js and npm
   - Check if Node.js and npm are installed:
     node --version
     npm --version
   - If not installed, download it here:
     https://nodejs.org/

### 1. How to run the executable
   To set up and run the "Let 'Em Cook" application, follow these steps:

   Linux/Mac Users:
   1. Download the `setup_and_run.sh` script.
   2. Open the terminal.
   3. cd into the directory where you want to clone the repository.
   4. Make the script executable:
      ```bash
      chmod +x setup_and_run.sh
      ```
   5. Run the script:
      ```bash
      ./setup_and_run.sh
      ```

   Windows Users:
   1. Download the `setup_and_run.bat` script.
   2. cd into the directory where you want to clone the repository.
   3. Double-click the `setup_and_run.bat` file to run it, or execute it in the terminal:
      ```cmd
      setup_and_run.bat
      ```

   The script will:
   - Clone the repository to your current directory (if not already cloned).
   - Install all backend dependencies using `pip`.
   - Install all frontend dependencies using `npm`.
   - Start both the backend (Flask) and frontend (React) servers.

### 2. Manual Setup (if needed)
   If you prefer to set up manually:
   1. Clone the repository:
      ```bash
      git clone https://github.com/tenzinpalden/let-em-cook.git
      cd let-em-cook
      ```
   2. Install backend dependencies:
      ```bash
      cd backend
      pip install -r requirements.txt
      cd ..
      ```
   3. Install frontend dependencies:
      ```bash
      cd letemcook
      npm install
      npm install concurrently --save-dev
      ```
   4. Start the application:
      ```bash
      npm run dev
      ```