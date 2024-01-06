import { HttpError } from '../helpers/index.js';
import { userSigninSchema } from '../models/User.js';

const isValidSigninRequest = (req, resp, next) => {
  const { error } = userSigninSchema.validate(req.body);
  if (error) {
    return next(HttpError(404, error.message));
  }
  next();
};

export default isValidSigninRequest;
