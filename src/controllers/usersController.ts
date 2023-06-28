import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { getUsers, registerUser } from '../logic/usersLogics';
import { type RegisterUser } from '../types';
import { StatusCodes } from '../types/error';
const usersController = Router();

// POST /users
usersController.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as RegisterUser;

    try {
      const user = await registerUser(data);

      res.status(StatusCodes.OK).send({
        success: `User ${data.firstName} with email ${data.email} registered successfully`,
        data: user,
      });
    } catch (e: any) {
      console.error('Error Type:', e.__type);
      console.error('Error Message:', e.Message);
      next(e);
    }
  },
);

// GET /users
usersController.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as RegisterUser;

    try {
      const response = await getUsers();

      res.status(StatusCodes.OK).send({
        data: response,
      });
    } catch (e: any) {
      console.error('Error Type:', e.__type);
      console.error('Error Message:', e.Message);
      next(e);
    }
  },
);

export default usersController;
