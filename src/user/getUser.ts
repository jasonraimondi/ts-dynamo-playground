import { GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

import { dbclient } from "~/dynamo";
import { User, userFromItem } from "~/user/user";

export async function getUser(username: string): Promise<{ user: User } | { error: string }> {
  try {
    const resp = await dbclient.send(new GetItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: User.id(username),
    }));

    if (!resp.Item) {
      return {
        error: 'User does not exist.'
      }
    }
    return {
      user: userFromItem(resp.Item)
    }
  } catch(error) {
    console.log('Error retrieving user')
    console.log(error)
    return {
      error: 'Could not retrieve user'
    }
  }
}
