import { Request, Response, NextFunction } from "express";
import MulterRequest from "../types/multerRequest";

const addFileToRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.file) {
    // if only one file was uploaded
    (req as MulterRequest).file = req.file;
  } else if (req.files && Array.isArray(req.files)) {
    // if multiple files were uploaded
    (req as MulterRequest).files = req.files;
  }
  next();
};

export default addFileToRequest;