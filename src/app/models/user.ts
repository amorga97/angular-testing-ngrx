export interface User {
  userName: string;
  email: string;
  twitter: string;
  phoneNumber: string;
}

export class User implements User {
  constructor({ userName, email, phoneNumber, twitter }: User) {
    this.userName = userName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.twitter = twitter;
  }
}
