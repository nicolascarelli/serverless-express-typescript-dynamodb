import { Request, Response, NextFunction } from "express";
import createOrUpdateValidateProduct from "../utils/validators/product";

export default function validateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = createOrUpdateValidateProduct(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}
