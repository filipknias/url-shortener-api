import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,

  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

export default mongoose.model('User', userSchema);