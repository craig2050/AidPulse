import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || "development";

dotenv.config({ path: path.resolve(`config/.env.${env}`) });

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  logLevel: process.env.LOG_LEVEL,
};

export default config;
