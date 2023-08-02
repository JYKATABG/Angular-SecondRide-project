export interface UserDB {
  _id: string | undefined;
  _userId: string | undefined;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  favouriteOffers: string[];
}
