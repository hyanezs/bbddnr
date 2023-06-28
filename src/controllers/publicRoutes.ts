import { Router } from 'express';
import messagesController from './messagesController';
import UsersController from './usersController';

const publicRoutes = Router();

publicRoutes.use('/users', UsersController);
publicRoutes.use('/messages', messagesController);

export default publicRoutes;
