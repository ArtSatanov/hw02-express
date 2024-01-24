import express from 'express';
import * as authController from '../../controllers/auth-controllers.js';
import {
  isEmptyBody,
  isValidSignup,
  isValidSignin,
  authenticate,
  upload,
} from '../../middlewares/index.js';

const authRouter = express.Router();

authRouter.post('/register', isEmptyBody, isValidSignup, authController.signup);
authRouter.post('/login', isEmptyBody, isValidSignin, authController.signin);
authRouter.post('/current', authenticate, authController.getCurrent);
authRouter.post('/logout', authenticate, authController.signout);
authRouter.patch(
  '/avatars',
  upload.single('avatar'),
  authenticate,
  authController.updateAvatar
);
authRouter.get(
  '/verify::verificationCode',
  authenticate,
  authController.verify
);

export default authRouter;
