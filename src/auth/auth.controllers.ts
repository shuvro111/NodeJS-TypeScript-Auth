import { Request, Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import User from '../user/entities/User';
import { sendResponse } from '../utils/sendResponse';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOneOrFail({
      where: {
        email,
      },
    });

    if (!existingUser) {
      //user not found
      sendResponse({
        res,
        statusCode: 401,
        success: false,
        message: 'User not found',
      });
    }

    //user found, check for password match
    if (existingUser.password !== password) {
      //password didn't match,login unsuccessful
      sendResponse({
        res,
        statusCode: 401,
        success: false,
        message: 'Username and password does not match',
      });
    }

    //password matched,login successful, sign jwt
    const payload: JwtPayload = {
      id: existingUser.id,
      email: existingUser.email,
    };
    const secret: Secret = process.env.JWT_SECRET as string;
    const token = 'Bearer ' + jwt.sign(payload, secret, { expiresIn: '7d' });
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: 'Login Successful',
      data: { ...existingUser, token },
    });
  } catch (error) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: (error as Error).message,
    });
  }
};
