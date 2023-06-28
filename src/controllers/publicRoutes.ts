import { Router } from 'express';
import UsersController from './usersController';

const publicRoutes = Router();

publicRoutes.use('/users', UsersController);

export default publicRoutes;
