import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  database: process.env.DATABASE || 'mongodb://localhost:27017/drone-survey',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
};

export default config;
