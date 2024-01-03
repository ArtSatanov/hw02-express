import express from 'express';
import * as contactsController from '../../controllers/contacts-controllers.js';
import {
  isEmptyBody,
  isValidAddRequest,
  isValidUpdateRequest,
} from '../../middlewares/index.js';

const router = express.Router();

router.get('/', contactsController.getAll);

// router.get('/:contactId', contactsController.getById);

// router.post('/', isEmptyBody, isValidAddRequest, contactsController.add);

// router.delete('/:contactId', contactsController.deleteById);

// router.put(
//   '/:contactId',
//   isEmptyBody,
//   isValidUpdateRequest,
//   contactsController.updateById
// );

export default router;
