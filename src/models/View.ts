import mongoose, { Schema } from "mongoose";

const viewsSchema = new mongoose.Schema({
  ip_address: {
    type: String,
    required: true,
    trim: true,
  },
  url_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Url' 
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('View', viewsSchema);