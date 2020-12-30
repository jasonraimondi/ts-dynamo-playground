import { PutItemCommand } from "@aws-sdk/client-dynamodb";

import { dbclient } from "~/dynamo";
import { User } from "~/user/User";

export async function createUser(...users: User[]) {
  for (const user of users) {
    await create(user).catch(console.log);
  }
}

export interface DynamoResponse<T = any> {
  error?: string;
  data?: T;
}

async function create(user: User): Promise<DynamoResponse<User>> {
  try {
    await dbclient.send(new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: user.toItem(),
      // ConditionExpression: "attribute_not_exists(PK)", // what does this mean?
    }));
    return { data: user };
  } catch (error) {
    console.log("Error creating user");
    console.log(error);
    let errorMessage = "Could not create user";
    if (error.code === "ConditionalCheckFailedException") {
      errorMessage = "Account with this name already exists.";
    }
    return { error: errorMessage };
  }
}
