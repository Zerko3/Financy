export class Account {
  name: string;
  email: string;
  accType: string;
  password: string;

  constructor(name: string, email: string, accType: string, password: string) {
    this.name = name;
    this.email = email;
    this.accType = accType;
    this.password = password;
  }

  // TODO:

  // is it good to add arrays in here to store data for an account. so that the data will be loaded when the user registers.
}
