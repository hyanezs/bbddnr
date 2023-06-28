import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { getMessages, registerMessage } from '../logic/messagesLogic';
import { StatusCodes } from '../types/error';
import { type Message } from '../types/models';
const messagesController = Router();

// POST /messages
messagesController.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as Message;
    try {
      const message = await registerMessage(data);

      res.status(StatusCodes.OK).send({
        success: `Message registered successfully`,
        data: message,
      });
    } catch (e: any) {
      next(e);
    }
  },
);

// GET /messages
messagesController.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as Message;
    try {
      const response = await getMessages();

      res.status(StatusCodes.OK).send({
        data: response,
      });
    } catch (e: any) {
      next(e);
    }
  },
);

export default messagesController;
