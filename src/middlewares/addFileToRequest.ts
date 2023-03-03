import { Request, Response, NextFunction } from "express";
import MulterRequest from "../types/multerRequest";

const addFileToRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  (req as MulterRequest).file = req.file;
  next();
};

export default addFileToRequest;