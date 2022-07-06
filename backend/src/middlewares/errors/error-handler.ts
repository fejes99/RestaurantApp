import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => res.status(500).json({ message: err });

export default errorHandlerMiddleware;
