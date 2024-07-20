"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const config = {
    port: process.env.PORT || 3000,
    database: process.env.DATABASE || 'mongodb://localhost:27017/drone-survey',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key'
};
exports.default = config;
