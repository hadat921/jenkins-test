import { Response } from "express";

export function sendJsonResponse(
  res: Response,
  status: number,
  message: string,
  data?: any
) {
  res.status(status).json({
    message,
    data,
  });
}
