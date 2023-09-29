export class Account {
  username: string;
  email: string;
  accType: string;
  password: string;

  constructor(
    username: string,
    email: string,
    accType: string,
    password: string
  ) {
    this.username = username;
    this.email = email;
    this.accType = accType;
    this.password = password;
  }
}
