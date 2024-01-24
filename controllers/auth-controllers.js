import { HttpError, sendEmail } from '../helpers/index.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import Jimp from 'jimp';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';

dotenv.config();

const { JWT_SECRET, BASE_URL } = process.env;
const avatarsPath = path.resolve('public', 'avatars');

export const signup = async (req, resp, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, 'Email in use');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const verificationToken = nanoid();
    const newUser = await User.create({
      ...req.body,
      avatarURL,
      password: hashPassword,
      verificationToken,
    });

    const verificationEmail = {
      to: email,
      subject: 'Verify email',
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
    };

    await sendEmail(verificationEmail);

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
    if (!user.verify) {
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

export const signout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });

    res.json({
      message: 'Signout success',
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, resp, next) => {
  try {
    if (!req.file) {
      throw HttpError(400, 'missing file');
    }
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsPath, filename);
    Jimp.read(oldPath)
      .then(image => {
        image.resize(250, 250).write(newPath);
      })
      .catch(err => {
        console.log(err);
      });
    await fs.rename(oldPath, newPath);
    const avatarURL = path.join('avatars', filename);

    console.log(avatarURL);

    await User.findByIdAndUpdate(_id, { avatarURL });
    resp.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    next(error);
  }
};

export const verify = async (req, resp, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    console.log(req.params);
    if (!user) {
      throw HttpError(404, 'User not found');
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: '0',
    });

    resp.json({
      message: 'Verification successful',
    });
  } catch (error) {
    next(error);
  }
};

export const resendVerifyEmail = async (req, resp, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, 'Email or password is wrong');
    }
    if (user.verify) {
      throw HttpError(400, 'Verification has already been passed');
    }
    const verificationEmail = {
      to: email,
      subject: 'Verify email',
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
    };

    await sendEmail(verificationEmail);

    resp.json({
      message: 'Verification email sent',
    });
  } catch (error) {
    next(error);
  }
};
