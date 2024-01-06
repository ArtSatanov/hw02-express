import express from 'express';
import * as contactsController from '../../controllers/contacts-controllers.js';
import {
  isEmptyBody,
  isValidAddRequest,
  isValidUpdateRequest,
  isValidId,
  isValidAddToFav,
} from '../../middlewares/index.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', isValidId, contactsController.getById);

contactsRouter.post(
  '/',
  isEmptyBody,
  isValidAddRequest,
  contactsController.add
);

contactsRouter.delete('/:contactId', isValidId, contactsController.deleteById);

contactsRouter.put(
  '/:contactId',
  isEmptyBody,
  isValidId,
  isValidUpdateRequest,
  contactsController.updateById
);

contactsRouter.patch(
  '/:contactId/favorite',
  isEmptyBody,
  isValidId,
  isValidAddToFav,
  contactsController.updateById
);

export default contactsRouter;
