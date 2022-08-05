import { Router } from 'express';
import isAuthenticated from '../auth/middleware';
import sayHelloHandler from './user.controllers';

const router = Router();

router.get('/', isAuthenticated, sayHelloHandler);

export default router;
