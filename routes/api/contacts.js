import express from 'express';
import * as contactsController from '../../controllers/contacts-controllers.js';
import isEmptyBody from '../../middlewares/isEmptyBody.js';

const router = express.Router();

router.get('/', contactsController.getAll);

router.get('/:contactId', contactsController.getById);

router.post('/', isEmptyBody, contactsController.add);

router.delete('/:contactId', contactsController.deleteById);

router.put('/:contactId', isEmptyBody, contactsController.updateById);

export default router;
