import { Router } from 'express';
import authRouter from './auth/auth.routes';
import isAuthenticated from './middlewares/middleware';
import { sayHelloHandler } from './user/user.controllers';
import userRouter from './user/user.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/', isAuthenticated, sayHelloHandler);
export default router;
