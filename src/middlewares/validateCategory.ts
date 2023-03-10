import { Request, Response, NextFunction } from "express";
import createOrUpdateValidateCategory from "../utils/validators/category";

export default function validateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = createOrUpdateValidateCategory(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}
