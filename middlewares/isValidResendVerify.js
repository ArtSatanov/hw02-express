import { HttpError } from '../helpers/index.js';
import { userResendVerify } from '../models/User.js';

const isValidResendVerify = (req, resp, next) => {
  const { error } = userResendVerify.validate(req.body);
  if (error) {
    return next(HttpError(404, error.message));
  }
  next();
};

export default isValidResendVerify;
