import { Router } from 'express';
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  
} from '../Controller/userrController';

const router: Router = Router();

// Route to create a new user
router.post('/create', createUser);

// Route to get a user by ID
router.get('/:id', getUserById);

// Route to update a user
router.put('/:id', updateUser);

// Route to delete a user
router.delete('/:id', deleteUser);

// Route to user login
router.post('/login', loginUser);

export default router;





