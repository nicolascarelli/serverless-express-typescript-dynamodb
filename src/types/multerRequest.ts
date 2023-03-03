import { Request } from "express";

interface MulterRequest extends Request {
  file?: Express.Multer.File,
  files?: Express.Multer.File[];
}

export default MulterRequest;
