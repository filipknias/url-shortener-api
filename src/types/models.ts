export interface IUrl {
  long_url: string;
  short_url: string;
  created_at: string;
  expires_at?: string;
}

export interface IUser {
  _id: string;
  email: string;
}