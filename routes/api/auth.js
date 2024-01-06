import express from 'express';
import * as authController from '../../controllers/auth-controllers.js';
import { isEmptyBody, isValidSignupRequest } from '../../middlewares/index.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  isEmptyBody,
  isValidSignupRequest,
  authController.signup
);
authRouter.post(
  '/login',
  isEmptyBody,
  isValidSignupRequest,
  authController.signup
);

export default authRouter;
