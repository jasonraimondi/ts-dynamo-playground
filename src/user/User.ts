export class User {
  public username: string;
  public name: string;
  public email?: string;
  public createdAt: Date;

  constructor({ username, name, email, createdAt = new Date() }) {
    if (!username) {
      throw new Error("User requires a username");
    }
    this.username = username;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
  }

  static id(username: string) {
    return {
      "PK": { "S": `ACCOUNT#${username.toLowerCase()}` },
      "SK": { "S": `ACCOUNT#${username.toLowerCase()}` },
    };
  }

  key() {
    return User.id(this.username);
  }

  gsi3pk() {
    return { "S": `ACCOUNT#${this.username.toLowerCase()}` };
  }

  gsi3() {
    return {
      "GSI3PK": this.gsi3pk(),
      "GSI3SK": { "S": `ACCOUNT#${this.username.toLowerCase()}` },
    };
  }


  toItem() {
    return {
      ...this.key(),
      ...this.gsi3(),
      "Type": { "S": "User" },
      "Username": { "S": this.username },
      "Name": { "S": this.name },
      "Email": { "S": this.email },
      "CreatedAt": { "S": this.createdAt.toISOString() },
    };
  }
}

export const userFromItem = (item): User => {
  if (item.Type.S !== "User") {
    throw new Error("Not a user.");
  }
  return new User({
    username: item.Username.S,
    name: item.Name.S,
    email: item.Email.S,
    createdAt: new Date(item.CreatedAt.S),
  });
};
