import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { addUpdateSettings, handleSaveError } from './hooks.js';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: 'starter',
    },
    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);
userSchema.pre('findOneAndUpdate', addUpdateSettings);
userSchema.post('findOneAndUpdate', handleSaveError);

export const userSignupSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    'any.required': `"email" must be string`,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': `"password" must contain 6 symbols`,
  }),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    'any.required': `"email" must be string`,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': `"password" must contain 6 symbols`,
  }),
});

export const userResendVerify = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    'any.required': `"email" must be string`,
  }),
});

const User = model('user', userSchema);

export default User;
