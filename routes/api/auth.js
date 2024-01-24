import express from 'express';
import * as authController from '../../controllers/auth-controllers.js';
import {
  isEmptyBody,
  isValidSignup,
  isValidSignin,
  authenticate,
  upload,
  isValidResendVerify,
} from '../../middlewares/index.js';

const authRouter = express.Router();

authRouter.post('/register', isEmptyBody, isValidSignup, authController.signup);
authRouter.get('/verify/:verificationToken', authController.verify);
authRouter.post('/login', isEmptyBody, isValidSignin, authController.signin);
authRouter.post(
  '/verify',
  isEmptyBody,
  isValidResendVerify,
  authController.resendVerifyEmail
);
authRouter.get('/current', authenticate, authController.getCurrent);
authRouter.post('/logout', authenticate, authController.signout);
authRouter.patch(
  '/avatars',
  upload.single('avatar'),
  authenticate,
  authController.updateAvatar
);

export default authRouter;
