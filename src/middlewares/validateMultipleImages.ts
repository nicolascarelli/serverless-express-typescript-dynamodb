import { Response, NextFunction, RequestHandler } from 'express';
import MulterRequest from '../types/multerRequest';
import validateImage from '../utils/validators/image';

const validateMultipleImages: RequestHandler<
  Record<string, any>,
  any,
  MulterRequest
> = (req, res, next) => {
  if (req.files) {
    const images = Array.isArray(req.files) ? req.files : [req.files];

    const errors = images.map(
      (image) => validateImage(image as Express.Multer.File).error
    );
    const hasErrors = errors.some((error) => error);

    if (hasErrors) {
      return res.status(400).json({ error: 'Invalid image(s)', errors });
    }
  }

  next();
};

export default validateMultipleImages;
