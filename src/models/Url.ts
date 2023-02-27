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

urlSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Url', urlSchema);