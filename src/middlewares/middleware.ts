import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { sendResponse } from '../utils/sendResponse';
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      sendResponse({
        res,
        statusCode: 401,
        success: false,
        message: 'Unauthorized user',
        data: req.logIn,
      });
    }
    next();
  })(req, res, next);
};

export default isAuthenticated;
