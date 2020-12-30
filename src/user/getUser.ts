import { GetItemCommand } from "@aws-sdk/client-dynamodb";

import { dbclient } from "~/dynamo";
import { User, userFromItem } from "~/user/User";
import { DynamoResponse } from "~/user/createUser";

export async function getUser(username: string): Promise<DynamoResponse<User>> {
  try {
    const resp = await dbclient.send(new GetItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: User.id(username),
    }));

    if (!resp.Item) {
      return { error: `User does not exist <${username}>` };
    }
    return {
      data: userFromItem(resp.Item),
    };
  } catch (error) {
    console.log("Error retrieving user");
    console.log(error);
    return {
      error: "Could not retrieve user",
    };
  }
}
