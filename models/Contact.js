import { Schema, model } from 'mongoose';
import { addUpdateSettings, handleSaveError } from './hooks.js';
import Joi from 'joi';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post('save', handleSaveError);
contactSchema.pre('findOneAndUpdate', addUpdateSettings);
contactSchema.post('findOneAndUpdate', handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `"name" must be exist`,
  }),
  email: Joi.string().required().messages({
    'any.required': `"email" must be exist`,
  }),
  phone: Joi.string().required().messages({
    'any.required': `"phone" must be exist`,
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().messages({
    'any.required': `"name" must be string`,
  }),
  email: Joi.string().messages({
    'any.required': `"email" must be string`,
  }),
  phone: Joi.string().messages({
    'any.required': `"phone" must be string`,
  }),
});

export const movieUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model('contact', contactSchema);

export default Contact;
