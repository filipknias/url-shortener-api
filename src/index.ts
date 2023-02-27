import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import urlController from './controllers/url.controller';
import redirectController from './controllers/redirect.controller';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`
);
mongoose.set('strictQuery', true);

const connection = mongoose.connection;
connection.on("error", console.error);
connection.once("open", () => {
  console.log("Connected successfully");
});

app.use(express.json());
app.use('/api/url', urlController);
app.use('/', redirectController);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});