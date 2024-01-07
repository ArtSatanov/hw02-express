import { HttpError } from '../helpers/index.js';
import Contact from '../models/Contact.js';

export const getAll = async (req, resp, next) => {
  try {
    const result = await Contact.find({}, '-createdAt -updatedAt');
    resp.json(result);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, resp, next) => {
  console.log(req.user);
  // try {
  //   const { contactId } = req.params;
  //   const result = await Contact.findById(contactId);
  //   if (!result) {
  //     throw HttpError(404);
  //   }
  //   resp.json(result);
  // } catch (error) {
  //   next(error);
  // }
};

export const add = async (req, resp, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    resp.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req, resp, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    resp.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req, resp, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    resp.status(200).json({ message: 'Delete success' });
  } catch (error) {
    next(error);
  }
};
