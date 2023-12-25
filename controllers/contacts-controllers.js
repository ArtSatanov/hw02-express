import * as contactService from '../models/contacts.js';
import { HttpError } from '../helpers/index.js';
import { contactAddSchema } from '../schemas/contacts-schemas.js';

export const getAll = async (req, resp, next) => {
  try {
    const result = await contactService.listContacts();
    resp.json(result);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, resp, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactService.getContactById(contactId);
    console.log(contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    resp.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const add = async (req, resp, next) => {
  try {
    const error = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactService.addContact(req.body);
    resp.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req, resp, next) => {
  try {
    const error = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactService.updateContact(contactId, resp.body);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    resp.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req, resp, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    resp.status(200).json({ message: 'Delete success' });
  } catch (error) {
    next(error);
  }
};
