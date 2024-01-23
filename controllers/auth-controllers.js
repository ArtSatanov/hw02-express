import { HttpError } from '../helpers/index.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

dotenv.config();

const { JWT_SECRET } = process.env;
const AvatarsPath = path.resolve('public', 'avatars');

export const signup = async (req, resp, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, 'Email in use');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    if (!newUser) {
      throw HttpError(404);
    }
    resp.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, resp, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, 'Email or password is wrong');
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, 'Email or password is wrong');
    }
    const { _id: id } = user;
    const payload = { id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' });
    await User.findByIdAndUpdate(id, { token });
    resp.json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, resp) => {
  const { email, subscription } = req.user;
  resp.json({ email, subscription });
};

export const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.json({
    message: 'Signout success',
  });
};

export const updateAvatar = async (req, resp) => {
  const { _id } = req.user;
  console.log(req.body);
  console.log(req.file);
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(AvatarsPath, filename);
  await fs.rename(oldPath, newPath);
  const avatar = path.join('public', 'avatars', filename);
  console.log(avatar);

  await User.findByIdAndUpdate(_id, { avatarURL: avatar });
};
