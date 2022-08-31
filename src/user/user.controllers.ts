import { NextFunction, Request, Response } from 'express';
import User from './entities/User';

//say hello
export const sayHelloHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      return res.status(200).json({
        success: true,
        message: 'User Fetched Successfully',
        user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `User Doesn't Exist`,
      });
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
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
      return res.status(200).json({
        success: true,
        message: 'User Fetched Successfully',
        user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `User Doesn't Exist`,
      });
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};

//get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    const totalUsers = await User.count();

    return res.status(200).json({
      success: true,
      message: 'User Fetched Successfully',
      users,
      totalUsers,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
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

      return res.status(200).json({
        success: true,
        message: 'User Created Successfully',
        user,
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        message: error,
      });
    }
  } else {
    return res.status(200).json({
      success: false,
      message: 'User Already Exists',
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

      return res.status(200).json({
        success: true,
        message: 'User Updated Successfully',
        user,
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        message: error,
      });
    }
  } else {
    return res.status(404).json({
      success: false,
      message: `User Doesn't  Exist`,
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
    return res.status(404).json({
      success: false,
      message: `User Doesn't  Exist`,
    });
  }
};
