import { Response } from 'express';

interface IResponse {
  res: Response;
  statusCode: number;
  success: boolean;
  message: string;
  data?: object;
}

export const sendResponse = (response: IResponse) => {
  const { res, statusCode, success, message, data } = response;
  res.status(statusCode).json({
    success,
    message,
    data: data || {},
  });
};
