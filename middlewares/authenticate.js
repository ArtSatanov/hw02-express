import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { HttpError } from '../helpers/index.js';
import User from '../models/User.js';

dotenv.config();

const { JWT_SECRET } = process.env;
const authenticate = async (req, resp, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(HttpError(401, 'Authorization not define'));
  }
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user) {
      return next(HttpError(401, 'User is not defind in DB'));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, 'Not authorized'));
  }
};

export default authenticate;
