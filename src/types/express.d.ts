import { Express } from "express-serve-static-core";
import { IJwtToken } from './jwtToken';

declare module "express-serve-static-core" {
  interface Request {
    user: IJwtToken;
  }
}