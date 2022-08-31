import { NextFunction, Request, Response } from 'express';
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  req.user
    ? next()
    : res.status(401).json({
        success: 0,
        message: "You're Unauthorized",
      });
};

export default isAuthenticated;
