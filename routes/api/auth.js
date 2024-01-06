import express from 'express';
import * as authController from '../../controllers/auth-controllers.js';
import {
  isEmptyBody,
  isValidSignup,
  isValidSignin,
} from '../../middlewares/index.js';

const authRouter = express.Router();

authRouter.post('/register', isEmptyBody, isValidSignup, authController.signup);
authRouter.post('/login', isEmptyBody, isValidSignin, authController.signin);

export default authRouter;
