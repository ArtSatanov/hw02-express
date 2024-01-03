import { HttpError } from '../helpers/index.js';
import Contact from '../models/Contact.js';

export const getAll = async (req, resp, next) => {
  try {
    const result = await Contact.find();
    resp.json(result);
  } catch (error) {
    next(error);
  }
};

// export const getById = async (req, resp, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactService.getContactById(contactId);
//     if (!result) {
//       throw HttpError(404);
//     }
//     resp.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// export const add = async (req, resp, next) => {
//   try {
//     const result = await contactService.addContact(req.body);
//     resp.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateById = async (req, resp, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactService.updateContact(contactId, req.body);
//     if (!result) {
//       throw HttpError(404, 'Not found');
//     }
//     resp.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteById = async (req, resp, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactService.removeContact(contactId);
//     if (!result) {
//       throw HttpError(404, 'Not found');
//     }
//     resp.status(200).json({ message: 'Delete success' });
//   } catch (error) {
//     next(error);
//   }
// };
