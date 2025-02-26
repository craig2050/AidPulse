import dotenv from "dotenv";

const env = process.env.NODE_ENV || "dev";

// Load environment variables from root .env file
dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  logLevel: process.env.LOG_LEVEL,
};

export default config;
