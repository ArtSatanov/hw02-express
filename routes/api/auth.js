import express from 'express';
import {
  isEmptyBody,
  isValidAddRequest,
  isValidUpdateRequest,
  isValidId,
  isValidAddToFav,
} from '../../middlewares/index.js';

const authRouter = express.Router();

export default authRouter;
