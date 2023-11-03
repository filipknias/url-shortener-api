import mongoose, { Document } from "mongoose";

export interface IUrl extends Document {
    long_url: string;
    short_url: string;
    created_at: Date;
    expires_at?: Date;
    user_id?: mongoose.Types.ObjectId;
}
  
export interface IUser extends Document {
    email: string;
    hash: string;
    created_at: Date;
}

export interface IView extends Document {
    ip_address: string;
    url_id: mongoose.Types.ObjectId;
    created_at: Date;
}