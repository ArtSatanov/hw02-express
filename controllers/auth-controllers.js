import { HttpError } from '../helpers/index.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const signup = async (req, resp, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, 'Email in use');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    if (!newUser) {
      throw HttpError(404);
    }
    resp.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, resp, next) => {
  return console.log('hello');
};
