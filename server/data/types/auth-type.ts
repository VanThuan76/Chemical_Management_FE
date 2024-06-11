import { IUser } from "./user-type";

export interface IAuthentication {
  token: string;
  refresh_token: string;
  user: IUser;
}