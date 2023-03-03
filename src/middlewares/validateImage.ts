import { RequestHandler } from "express";
import MulterRequest from "../types/multerRequest";
import validateImage from "../utils/validators/image";

const validateImageMiddleware: RequestHandler<
  Record<string, any>,
  any,
  MulterRequest
> = (req, res, next) => {
  if (req.file) {
    const { error } = validateImage(req.file);
    if (error) {
      return res.status(400).json({ error });
    }
  }
  next();
};

export default validateImageMiddleware;
