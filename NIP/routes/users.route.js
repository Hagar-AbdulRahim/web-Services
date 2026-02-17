import express from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controller/users.controller.js';

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);
usersRouter.put('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);

export { usersRouter };
