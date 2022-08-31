import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
} from './user.controllers';

const router = Router();

// router.get('/', isAuthenticated, sayHelloHandler);

router.get('/', async (req, res) => getAllUsers(req, res)); //get all  users
router.get('/user-by-email', async (req, res) => getUserByEmail(req, res)); //get user by email
router.get('/:id', async (req, res) => getUserById(req, res)); //get user by id
router.post('/create', async (req, res) => await createUser(req, res)); //create user
router.put('/update/:id', async (req, res) => await updateUser(req, res)); //update user
router.delete('/delete/:id', async (req, res) => await deleteUser(req, res)); //delete user

export default router;
