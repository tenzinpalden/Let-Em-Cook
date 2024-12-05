@echo off

:: Clone the repository
if not exist "let-em-cook" (
  echo Cloning repository...
  git clone https://github.com/tenzinpalden/let-em-cook.git
) else (
  echo Repository already cloned.
)

:: Navigate to project directory
cd let-em-cook

:: Backend setup
cd backend
echo Setting up backend...
pip install -r requirements.txt

:: Frontend setup
cd ..\letemcook
echo Setting up frontend...
npm install
npm install concurrently --save-dev

:: Start the application
echo Starting the application...
npm run dev