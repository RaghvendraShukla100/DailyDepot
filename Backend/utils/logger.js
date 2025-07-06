// /backend/utils/logger.js

import winston from "winston";
import path from "path";
import fs from "fs";

// Ensure logs directory exists
const logDir = path.resolve(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Define log format with metadata support
const logFormat = winston.format.printf(
  ({ level, message, timestamp, ...metadata }) => {
    let msg = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    if (Object.keys(metadata).length > 0) {
      msg += ` | ${JSON.stringify(metadata)}`;
    }
    return msg;
  }
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "exceptions.log"),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "rejections.log"),
    }),
  ],
});

// Colored, timestamped console logs in development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message, ...metadata }) => {
          let msg = `[${timestamp}] ${level}: ${message}`;
          if (Object.keys(metadata).length > 0) {
            msg += ` | ${JSON.stringify(metadata)}`;
          }
          return msg;
        })
      ),
    })
  );
}

export default logger;
