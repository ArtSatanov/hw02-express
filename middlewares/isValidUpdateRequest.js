import { HttpError } from '../helpers/index.js';
import { contactUpdateSchema } from '../models/Contact.js';

const isValidUpdateRequest = (req, resp, next) => {
  const { error } = contactUpdateSchema.validate(req.body);
  if (error) {
    return next(HttpError(404, error.message));
  }
  next();
};

export default isValidUpdateRequest;
