import { HttpError } from '../helpers/index.js';
import User from '../models/User.js';

export const signup = async (req, resp, next) => {
  try {
    const newUser = await User.create(req.body);
    if (!newUser) {
      throw HttpError(404);
    }
    resp.json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = () => {
  return console.log('hello');
};
