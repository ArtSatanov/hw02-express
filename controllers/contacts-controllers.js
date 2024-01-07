import { HttpError } from '../helpers/index.js';
import Contact from '../models/Contact.js';

export const getAll = async (req, resp, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find(
      { owner },
      '-createdAt -updatedAt',
      {
        skip,
        limit,
      }.populate('owner', 'username')
    );
    resp.json(result);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, resp, next) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOne({ contactId, owner });
    if (!result) {
      throw HttpError(404);
    }
    resp.json(result);
  } catch (error) {
    next(error);
  }
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
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndUpdate(
      { contactId, owner },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
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
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndDelete({ contactId, owner });
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    resp.status(200).json({ message: 'Delete success' });
  } catch (error) {
    next(error);
  }
};
