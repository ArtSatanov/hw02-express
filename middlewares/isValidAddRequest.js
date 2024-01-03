import { HttpError } from '../helpers/index.js';
import { contactAddSchema } from '../models/Contact.js';

const isValidAddRequest = (req, resp, next) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    return next(HttpError(404, error.message));
  }
  next();
};

export default isValidAddRequest;
