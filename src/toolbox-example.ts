import "tsconfig-paths/register";
import "dotenv/config";

import { Entity, Table } from "dynamodb-toolbox";
import { config, DynamoDB } from "aws-sdk";

config.update({ region: "us-west-2" });

const MyTable = new Table({
  name: process.env.TABLE_NAME,
  partitionKey: "PK",
  sortKey: "SK",
  DocumentClient: new DynamoDB.DocumentClient(),
});

export const User = new Entity({
  name: "User",
  timestamps: true,
  attributes: {
    email: { partitionKey: true, prefix: "USER#" },
    SK: { hidden: true, sortKey: true },
    firstName: { required: false },
    lastName: { required: false },
    passwordHash: { required: false },
    role: ["SK", 0],
    status: ["SK", 1],
  },
  table: MyTable,
});

enum UserStatus {
  New = "new",
  Active = "active",
}

enum UserRole {
  Plebian = "plebian",
  Admin = "admin",
}

interface IUser {
  email: string;
  firstName?: string;
  lastName?: string;
  passwordHash?: string;
  status: UserStatus;
  role: UserRole;
}

(async () => {
  console.log(
    await User.put({
      firstName: "Jane",
      lastName: "Smith",
      email: "jason@raimondi.us",
      status: UserStatus.New,
      role: UserRole.Plebian,
    } as IUser),
    await User.put({
      email: "jason@raimondi.us",
      status: UserStatus.New,
      role: UserRole.Admin,
    } as IUser),
  );
})();