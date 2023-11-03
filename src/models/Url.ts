import mongoose, { Schema, InferSchemaType } from "mongoose";
import View from './View';
import { IUrl } from "../types/models";

const urlSchema = new mongoose.Schema({
  long_url: {
    type: String,
    required: true,
    trim: true,
  },
  short_url: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  expires_at: {
    type: Date,
    required: false,
    validate: {
      validator: (value: Date) => {
        return value > new Date();
      },
      message: 'Field expires_at must be a date and in the future'
    }
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
});

urlSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

urlSchema.post("deleteOne", async function(doc: IUrl, next)  {
  try {
    await View.deleteMany({ _id: { $in: doc._id } });
    next();
  } catch (err: any) {
    next(err);
  }
});

export default mongoose.model('Url', urlSchema);