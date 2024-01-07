import express from 'express';
import * as authController from '../../controllers/auth-controllers.js';
import {
  isEmptyBody,
  isValidSignup,
  isValidSignin,
  authenticate,
} from '../../middlewares/index.js';

const authRouter = express.Router();

authRouter.post('/register', isEmptyBody, isValidSignup, authController.signup);
authRouter.post('/login', isEmptyBody, isValidSignin, authController.signin);
authRouter.post('/current', authenticate, authController.getCurrent);
authRouter.post('/signout', authenticate, authController.signout);

export default authRouter;
