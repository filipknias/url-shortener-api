import mongoose from "mongoose";

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
  },
});

export default mongoose.model('Url', urlSchema);