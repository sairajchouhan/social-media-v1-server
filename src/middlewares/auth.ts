import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../entity';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new Error('Unauthorised');
    const jwtToken = token.split(' ')[1];

    const { id }: any = verify(jwtToken, process.env.JWT_SECRET!);

    const user = await User.findOne({ id });
    if (!user) throw new Error('Unauthorised');

    res.locals.user = user;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
