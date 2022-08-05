import { NextFunction, Request, Response } from 'express';

const sayHelloHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    success: 1,
    message: 'Hello World!',
  });
};

export default sayHelloHandler;
