# AidPulse - AI-Powered Emergency Response Assistant

AidPulse deploys lightweight, local AI agents that run on-device which processes real-time data to evaluate risks, channel help, and allocate resources even when networks are down. Built with React, Node.js, Express, and MongoDB, AidPulse enhances emergency response through intelligent, decentralized assistance.

## Why AidPulse?  

**Driven by Data:** Inspired by research on wildfire trends over the past 28 years, which showed a rise in severe, large-scale wildfires. AidPulse bridges the gap between data insights and real-world emergency response.  

**AI for Impact:** Integrating LLMs and interactive dashboards, AidPulse personalizes emergency guidance for different user roles.  

**Making a Difference:** As wildfires grow more destructive, we need smarter solutions—AidPulse delivers exactly that.  

## Key Features  

AidPulse serves as an AI-powered emergency response platform that functions even in offline scenarios:

- **People Affected:** Immediate alerts and guidance for safer evacuations 
- **Responders:** Enhanced tools with interactive graphics for rapid decision-making 
- **Support Volunteers:** A streamlined system to coordinate relief efforts effectively

## Project Demo
- **[Demo Video (if applicable)]**

## Tech Stack  

**Frontend:** React, React Router, Redux  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**APIs & Integrations:** OpenAI GPT (for chatbot), Firebase, Google Maps API  
**Deployment:** Docker, CI/CD, Azure/GCP  

## Quick Start  

### Setup (macOS / Linux)  
```bash  
# Install dependencies  
cd backend && npm install && cd ../frontend && npm install  

# Start backend & frontend  
cd backend && npm start & cd ../frontend && npm start  
```

### Setup (Windows)  
```powershell  
# Install dependencies  
cd backend; npm install; cd ../frontend; npm install  

# Start backend & frontend  
start cmd /k "cd backend && npm start"  
start cmd /k "cd frontend && npm start"  
```

### Environment Variables  

Create a `.env` file in the backend directory:  
```plaintext  
NODE_ENV=development  
PORT=3000  
MONGO_URL=mongodb://127.0.0.1:27017/AidPulse  
LOG_LEVEL=debug  
```

## Project Structure  

```
AidPulse/  
│── backend/        # Node.js & Express backend  
│   ├── routes/     # API routes  
│   ├── models/     # Mongoose models  
│   ├── config/     # Config files  
│   ├── index.js    # Backend entry point  
│── frontend/       # React frontend  
│   ├── src/  
│   │   ├── components/  
│   │   ├── pages/  
│   │   ├── App.js  
│── docs/           # Documentation & presentations  
│── README.md  
│── .env.example    # Example environment variables  
│── package.json  
```

## Troubleshooting  

### MongoDB Issues  
- macOS: `brew services restart mongodb-community`  
- Windows: `net start MongoDB`  

### Port Conflicts  
- **Backend (3000):** Run `lsof -i :3000` (Mac) or `netstat -ano | findstr :3000` (Windows)  
- **Frontend (3001):** Run with a different port:  
  ```bash  
  PORT=3002 npm start  
  ```

## Future Enhancements  

- LLM-powered real-time assistance  
- Live data streaming for emergency tracking  
- Automated integration with first responders' systems  

## Hackathon Recognition  

AidPulse won the [Hackathon Name]! This project was built at the [Event Name] to tackle wildfire emergency response using AI.  

## License  

This project is licensed under the MIT License.  

AidPulse aims to use AI-driven solutions to enhance disaster response and save lives.

## Acknowledgments

Local LLM simulation powered by [ollama_flask_api](https://github.com/craig2050/ollama_flask_api)
