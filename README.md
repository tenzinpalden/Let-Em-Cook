# Let 'Em Cook

Let 'Em Cook is a recipe-sharing platform designed to help college students create simple and affordable meals. 
Users can view, upload, and share recipes. The project consists of a React frontend and a Flask backend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installing and Running with Ant](#installing-and-running-with-ant)

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
     ```bash
     python --version
     ```
   - If not installed, download it here:
     https://www.python.org/downloads/

2. Node.js and npm
   - Check if Node.js and npm are installed:
     ```bash
     node --version
     npm --version
     ```
   - If not installed, download it here:
     https://nodejs.org/

## Installing and Running with Ant

### Installing Ant

#### Mac Users:
1. Install Homebrew if not already installed:

2. Use Homebrew to install Ant:
   ```bash
   brew install ant
   ```
3. Verify installation:
   ```bash
   ant -version
   ```

#### Windows Users:
1. Download Ant from the official Apache website:
   https://ant.apache.org/bindownload.cgi
2. Verify installation by opening the Command Prompt and running:
   ```cmd
   ant -version
   ```

### Running the Build File

1. Ensure the repository has been cloned:
   ```bash
   git clone https://github.com/tenzinpalden/let-em-cook.git
   cd let-em-cook
   ```
2. Ensure you have the `build.xml` file in the root directory of the project.
3. Run Ant to set up and start the project.

#### Mac/Linux:
   ```bash
   ant setup-and-run
   ```

#### Windows:
   ```cmd
   ant setup-and-run
   ```

This will:
- Install backend dependencies.
- Install frontend dependencies.
- Start both the Flask backend and React frontend.
