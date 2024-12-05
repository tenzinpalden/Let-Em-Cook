#!/bin/bash

# Clone the repository
if [ ! -d "let-em-cook" ]; then
  echo "Cloning repository..."
  git clone https://github.com/tenzinpalden/let-em-cook.git
else
  echo "Repository already cloned."
fi

# Navigate to project directory
cd let-em-cook || exit

# Backend setup
echo "Setting up backend..."
cd backend || exit
pip install -r requirements.txt

# Frontend setup
cd ../letemcook || exit
echo "Setting up frontend..."
npm install
npm install concurrently --save-dev

# Start the application
echo "Starting the application..."
npm run dev