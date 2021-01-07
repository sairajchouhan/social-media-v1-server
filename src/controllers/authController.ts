import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

import { Profile, User } from '../entity';

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  let errors: any = {};

  const emailUser = await User.findOne({ email });
  const usernameUser = await User.findOne({ username });

  if (emailUser) errors.email = 'Email is already taken';
  if (usernameUser) errors.username = 'Username is already taken';
  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  const user = User.create({ username, email, password });
  const userProfile = Profile.create();
  errors = await validate(user);

  if (Object.keys(errors).length > 0) {
    const sendErrors: any = {};
    errors.forEach((err: any) => {
      sendErrors[err.property] = Object.values(err.constraints)[0];
    });
    return res.status(400).json(sendErrors);
  }
  user.profile = userProfile;
  await userProfile.save();
  await user.save();

  return res.status(201).json(user);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

  const token = sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '60m',
  });
  res.set(
    'Set-Cookie',
    cookie.serialize('token', `Bearer ${token}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    })
  );

  return res.json(user);
};
export const logoutUser = async (_: Request, res: Response) => {
  res.set(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    })
  );

  return res.status(200).json({ success: true });
};
