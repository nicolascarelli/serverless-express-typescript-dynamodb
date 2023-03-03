import { RequestHandler, Response, NextFunction } from "express";
import MulterRequest from "../types/multerRequest";

const asyncMiddleware =
  <T>(
    fn: (req: MulterRequest, res: Response, next: NextFunction) => Promise<T>
  ): RequestHandler =>
  (req, res, next) => {
    fn(req as MulterRequest, res, next).catch(next);
  };

export default asyncMiddleware;
