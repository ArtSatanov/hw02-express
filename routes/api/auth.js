import express from 'express';
import * as authController from '../../controllers/auth-controllers.js';
import { isEmptyBody, IsValidSignupRequest } from '../../middlewares/index.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  isEmptyBody,
  IsValidSignupRequest,
  authController.signup
);

export default authRouter;
