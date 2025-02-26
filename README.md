# FireAI - Wildfire Response Assistant

This project is a web application designed to assist in wildfire emergency situations by providing an AI-powered chat interface for different user roles: victims, citizens, responders, and helpers. The application uses a React frontend with a Node.js/Express backend connected to MongoDB for data storage.

## Project Overview

FireAI serves as a communication platform during wildfire emergencies, offering tailored assistance based on user roles:
- **Victims**: Direct communication and assistance for those in immediate danger
- **Citizens**: General information and safety guidance
- **Responders**: Enhanced interface with interactive graphics for emergency responders
- **Helpers**: Resources and guidance for those providing assistance

## Quick Start

The easiest way to run the application is using the provided startup scripts:

### macOS / Linux
```bash
# Make the script executable (first time only)
chmod +x start.sh

# Run the application
./start.sh
```

### Windows
```
# Simply double-click start.bat file
# Or run from command prompt:
start.bat
```

The scripts will:
1. Check for and start MongoDB if not running
2. Install backend dependencies and start the backend server
3. Install frontend dependencies and start the frontend server
4. Open browser windows/tabs for both servers

Once running, access the application at http://localhost:3001

## Project Structure

- **backend/**: Node.js/Express backend
  - **config/**: Configuration files including environment settings
  - **index.js**: Main entry point for the Express application
  - **package.json**: Backend dependencies and scripts
  
- **frontend/**: React-based frontend application
  - **public/**: Static assets and HTML entry point
  - **src/**: Source code for the frontend
    - **Components/**: React components organized by feature
      - **Chat/**: Chat interface components including MessageInput and MessageList
      - **Home/**: Home screen with role selection buttons
      - **InteractiveGraphic/**: Interactive visual components for responders and helpers
    - **App.js**: Main application component with routing logic
  
- **presentation/**: Project presentation materials
  - **initial_presentation.pptx**: Project presentation slides

## Technologies Used

### Backend
- Node.js with Express
- MongoDB for data storage
- Mongoose for database modeling
- Axios for HTTP requests
- dotenv for environment configuration

### Frontend
- React (v19.0.0)
- React DOM
- React Scripts
- Testing libraries (Jest, React Testing Library)

## Setup and Installation

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the backend directory with the following variables:
   ```
   NODE_ENV=development
   PORT=3000
   MONGO_URL=mongodb://127.0.0.1:27017/test
   LOG_LEVEL=debug
   ```
4. For production, update the environment variables:
   ```
   NODE_ENV=production
   MONGO_URL=mongodb+srv://[username]:[password]@[cluster-address]/
   LOG_LEVEL=error
   ```
5. Start the backend in development mode:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. The application will be available at http://localhost:3000

## Manual Setup and Installation

If you prefer to set up the application manually, follow these steps:

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the backend directory with the following variables:
   ```
   NODE_ENV=development
   PORT=3000
   MONGO_URL=mongodb://127.0.0.1:27017/test
   LOG_LEVEL=debug
   ```
4. For production, update the environment variables:
   ```
   NODE_ENV=production
   MONGO_URL=mongodb+srv://[username]:[password]@[cluster-address]/
   LOG_LEVEL=error
   ```
5. Start the backend in development mode:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   PORT=3001 npm start
   ```
4. The application will be available at http://localhost:3001

## Troubleshooting

### MongoDB Issues
- **macOS**: If MongoDB doesn't start, try `brew services restart mongodb-community`
- **Windows**: Ensure MongoDB service is running or start it with `net start MongoDB`

### Port Conflicts
- If port 3000 is in use, the backend will fail to start. Check for processes using this port:
  - macOS/Linux: `lsof -i :3000`
  - Windows: `netstat -ano | findstr :3000`
- If port 3001 is in use, set a different port for the frontend:
  - `PORT=3002 npm start` (macOS/Linux)
  - `set PORT=3002 && npm start` (Windows)

## Features in Development

Currently developing the following features based on the todoList:
- Prompt creation and validation
- Response verification based on priority
- User identity management
- Emergency tracking
- Communication with central server
- LLM integration for intelligent responses

## License

This project is licensed under the ISC License.
