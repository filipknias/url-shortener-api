export interface IUrl {
  _id: string;
  long_url: string;
  short_url: string;
  created_at: string;
  expires_at?: string;
  user_id?: string;
}

export interface IUser {
  _id: string;
  email: string;
}