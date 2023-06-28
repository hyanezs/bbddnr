import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { getUsers, registerUser } from '../logic/usersLogics';
import { StatusCodes } from '../types/error';
import { type User } from '../types/models';
const usersController = Router();

// POST /users
usersController.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      firstName,
      lastName,
      username,
      profileImagePath,
      friends,
      servers,
      email,
      password,
      gender,
      birthdate,
      nitro,
      settings,
    } = req.body as User;

    try {
      const user = await registerUser({
        firstName,
        lastName,
        username,
        profileImagePath,
        friends,
        servers,
        email,
        password,
        gender,
        birthdate,
        nitro,
        settings,
      } as User);

      res.status(StatusCodes.OK).send({
        success: `User ${firstName} with email ${email} registered successfully`,
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
