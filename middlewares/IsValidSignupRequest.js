import { HttpError } from '../helpers/index.js';
import { userSignupSchema } from '../models/User.js';

const IsValidSignupRequest = (req, resp, next) => {
  const { error } = userSignupSchema.validate(req.body);
  if (error) {
    return next(HttpError(404, error.message));
  }
  next();
};

export default IsValidSignupRequest;
