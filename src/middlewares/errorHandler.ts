import { Request, Response } from 'express';
import { logger } from '../utils/logger';

export const errorHandler = (error: Error, req: Request, res: Response) => {
  logger.error('An error occurred:', error);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    error: {
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? '' : error.stack,
    },
  });
};

process.on('uncaughtException', (error) => {
  logger.log('uncaughtException', error);
});
