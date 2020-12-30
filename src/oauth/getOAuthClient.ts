import { GetItemCommand } from "@aws-sdk/client-dynamodb";

import { dbclient } from "~/dynamo";
import { OAuthClient, clientFromItem } from "~/oauth/OAuthClient";
import { DynamoResponse } from "~/user/createUser";

export async function getOAuthClient(identifier: string): Promise<DynamoResponse<OAuthClient>> {
  try {
    const resp = await dbclient.send(new GetItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: OAuthClient.id(identifier),
    }));

    if (!resp.Item) {
      return { error: `OAuthClient does not exist <${identifier}>` };
    }

    return { data: clientFromItem(resp.Item) };
  } catch (error) {
    console.log("Error retrieving OAuthClient");
    console.log(error);
    return {
      error: "Could not retrieve OAuthClient",
    };
  }
}
