import { JwtPayload } from 'jsonwebtoken';

export interface IJwtToken extends JwtPayload {
  id: string;
}