#!/bin/bash

# FireAI Startup Script
# This script starts all the necessary components for the FireAI application

# Text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print a header
print_header() {
    echo -e "\n${BLUE}============================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}============================================${NC}\n"
}

# Function to handle errors
handle_error() {
    echo -e "${RED}ERROR: $1${NC}"
    exit 1
}

# Navigate to the project directory
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR" || handle_error "Could not navigate to project directory"

print_header "Starting FireAI Application"

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo -e "${RED}MongoDB is not installed. Please install MongoDB first.${NC}"
    echo -e "${YELLOW}You can install it using: brew install mongodb-community${NC}"
    exit 1
fi

# Start MongoDB service if not running
echo -e "${YELLOW}Starting MongoDB service...${NC}"
if ! pgrep mongod &> /dev/null; then
    brew services start mongodb-community || handle_error "Failed to start MongoDB service"
    echo -e "${GREEN}MongoDB service started successfully.${NC}"
else
    echo -e "${GREEN}MongoDB service is already running.${NC}"
fi

# Setup and start Backend
print_header "Setting up Backend"
cd "$PROJECT_DIR/backend" || handle_error "Could not navigate to backend directory"

echo -e "${YELLOW}Installing backend dependencies...${NC}"
npm install || handle_error "Failed to install backend dependencies"
echo -e "${GREEN}Backend dependencies installed successfully.${NC}"

# Start the backend server in a new terminal window
echo -e "${YELLOW}Starting backend server...${NC}"
osascript -e "tell application \"Terminal\" to do script \"cd \\\"$PROJECT_DIR/backend\\\" && npm run dev\""
echo -e "${GREEN}Backend server started on port 3000.${NC}"

# Setup and start Frontend
print_header "Setting up Frontend"
cd "$PROJECT_DIR/frontend" || handle_error "Could not navigate to frontend directory"

echo -e "${YELLOW}Cleaning frontend node_modules...${NC}"
if [ -d "node_modules" ]; then
    rm -rf node_modules package-lock.json
    echo -e "${GREEN}Frontend node_modules cleaned successfully.${NC}"
fi

echo -e "${YELLOW}Installing frontend dependencies...${NC}"
# Create .env file to ensure correct NODE_PATH
echo "NODE_PATH=./node_modules" > .env
npm install || handle_error "Failed to install frontend dependencies"
echo -e "${GREEN}Frontend dependencies installed successfully.${NC}"

# Start the frontend server in a new terminal window
echo -e "${YELLOW}Starting frontend server...${NC}"
osascript -e "tell application \"Terminal\" to do script \"cd \\\"$PROJECT_DIR/frontend\\\" && npm run dev\""
echo -e "${GREEN}Frontend server started on port 3000.${NC}"

print_header "FireAI Application Started"
echo -e "${GREEN}Backend:${NC} http://localhost:3000"
echo -e "${GREEN}Frontend:${NC} http://localhost:3000"
echo -e "\n${YELLOW}Note: Check the terminal windows for any error messages.${NC}"
echo -e "${YELLOW}Use Ctrl+C in each terminal window to stop the servers when done.${NC}"
