import { PutItemCommand } from "@aws-sdk/client-dynamodb";

import { dbclient } from "~/dynamo";
import { User } from "~/user/user";

export async function createUser(...users: User[]) {
  for (const user of users) {
    await create(user);
  }
}

async function create(user: User) {
  try {
    await dbclient.send(new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: user.toItem(),
      ConditionExpression: "attribute_not_exists(PK)",
    }));
    return { user };
  } catch (error) {
    console.log("Error creating user");
    console.log(error);
    let errorMessage = "Could not create user";
    // If it's a condition check violation, we'll try to indicate which condition failed.
    if (error.code === "ConditionalCheckFailedException") {
      errorMessage = "Account with this name already exists.";
    }
    return {
      error: errorMessage,
    };
  }
}
