import User from '../models/User';
import { ExtractJwt } from 'passport-jwt';

interface Payload {
  id: string;
}

export const verifyCallback = (payload: Payload, done: (error: any, user?: any) => void) => {
  try {
    const user = User.findOne({ _id: payload.id });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}

export const config = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "nOOJQxxy7",
}