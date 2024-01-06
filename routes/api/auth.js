import express from 'express';
import * as userController from '../../controllers/auth-controllers.js';
import {
  isEmptyBody,
  IsValidSignupRequest,
  isValidUpdateRequest,
  isValidId,
  isValidAddToFav,
} from '../../middlewares/index.js';

const authRouter = express.Router();

authRouter.post(
  '/signup',
  isEmptyBody,
  IsValidSignupRequest,
  userController.signup
);

export default authRouter;
