import * as jwt from 'jsonwebtoken';
import { IJwtToken } from './jwtToken';

declare module 'jsonwebtoken' {
  export type CustomJwtPayload = IJwtToken & jwt.JwtPayload
}