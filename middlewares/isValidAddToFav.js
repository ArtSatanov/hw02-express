import { HttpError } from '../helpers/index.js';
import { movieUpdateFavoriteSchema } from '../models/Contact.js';

const isValidAddToFav = (req, resp, next) => {
  const { error } = movieUpdateFavoriteSchema.validate(req.body);
  if (error) {
    return next(HttpError(404, error.message));
  }
  next();
};

export default isValidAddToFav;
