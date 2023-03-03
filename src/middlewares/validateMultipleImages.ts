import { Response, NextFunction } from "express";
import MulterRequest from "../types/multerRequest";
import validateImage from "../utils/validators/image";

const validateProductImages = (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.files) {
    const images = Array.isArray(req.files) ? req.files : [req.files];

    const errors = images.map((image) => validateImage(image).error);
    const hasErrors = errors.some((error) => error !== undefined);

    if (hasErrors) {
      return res.status(400).json({ error: "Invalid image(s)" });
    }
  }

  next();
};

export default validateProductImages;
