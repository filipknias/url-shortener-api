import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy } from 'passport-jwt';

import urlController from './controllers/url.controller';
import redirectController from './controllers/redirect.controller';
import authController from './controllers/auth.controller';

import User from './models/User';
import { config, verifyCallback } from './config/passport';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
);
mongoose.set('strictQuery', true);

const connection = mongoose.connection;
connection.on("error", console.error);
connection.once("open", () => {
  console.log("Connected successfully");
});

passport.use(User.createStrategy());
passport.use(new Strategy(config, verifyCallback));

app.use(express.json());
app.use('/api/url', urlController);
app.use('/', redirectController);
app.use('/api/auth', authController);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});