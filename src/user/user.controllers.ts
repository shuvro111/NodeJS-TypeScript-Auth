import { Request, Response } from 'express';
import { sendResponse } from '../utils/sendResponse';
import User from './entities/User';

//say hello
export const sayHelloHandler = (req: Request, res: Response) => {
  res.status(200).send({
    success: true,
    message: 'Hello World!',
  });
};

//get user by email
export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: 'User fetched succesfully',
        data: user,
      });
    } else {
      sendResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'User does not exist',
      });
    }
  } catch (error) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: (error as Error).message,
    });
  }
};

//get user by id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (user) {
      sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: 'User fetched successfully',
      });
    } else {
      sendResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'User does not exist',
      });
    }
  } catch (error) {
    sendResponse({
      res,
      statusCode: 200,
      success: false,
      message: (error as Error).message,
    });
  }
};

//get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    const totalUsers = await User.count();
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: 'User fetched successfully',
      data: { ...users, totalUsers },
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

//create user
export const createUser = async (req: Request, res: Response) => {
  //check if already registered
  const existingUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  //if user doesn't exists, create one
  if (!existingUser) {
    try {
      const user = User.create(req.body);
      await user.save();

      sendResponse({
        res,
        success: true,
        statusCode: 200,
        message: 'User created successfully',
        data: user,
      });
    } catch (error) {
      sendResponse({
        res,
        success: false,
        message: (error as Error).message,
        statusCode: 500,
      });
    }
  } else {
    sendResponse({
      res,
      success: false,
      statusCode: 500,
      message: 'User already exists',
    });
  }
};

//update user
export const updateUser = async (req: Request, res: Response) => {
  //find user by id
  const user = await User.findOne({
    where: {
      id: parseInt(req.params.id),
    },
  });

  //if user exists, update
  if (user) {
    try {
      await User.update(user.id, req.body);
      await user.reload();

      sendResponse({
        res,
        success: true,
        statusCode: 200,
        message: 'User updated successfully',
        data: user,
      });
    } catch (error) {
      sendResponse({
        res,
        statusCode: 500,
        success: false,
        message: (error as Error).message,
      });
    }
  } else {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'User does not  exist',
    });
  }
};

//delete user
export const deleteUser = async (req: Request, res: Response) => {
  //find user by id
  const user = await User.findOne({
    where: {
      id: parseInt(req.params.id),
    },
  });

  //if user exists, delete
  if (user) {
    try {
      await User.delete(user.id);

      return res.status(200).json({
        success: true,
        message: 'User Deleted Successfully',
        user,
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        message: error,
      });
    }
  } else {
    sendResponse({
      res,
      statusCode: 404,
      success: false,
      message: 'User does not exist',
    });
  }
};
