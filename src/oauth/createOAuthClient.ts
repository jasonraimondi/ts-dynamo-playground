import { PutItemCommand } from "@aws-sdk/client-dynamodb";

import { dbclient } from "~/dynamo";
import { OAuthClient } from "~/oauth/OAuthClient";
import { DynamoResponse } from "~/user/createUser";

export async function createOAuthClient(...oauthClients: OAuthClient[]) {
  for (const oauthClient of oauthClients) {
    await create(oauthClient).catch(console.log);
  }
}

async function create(oauthClient: OAuthClient): Promise<DynamoResponse<OAuthClient>> {
  try {
    await dbclient.send(new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: oauthClient.toItem(),
      ConditionExpression: "attribute_not_exists(PK)", // what does this mean?
    }));
    return { data: oauthClient };
  } catch (error) {
    console.log("Error creating oauthClient");
    console.log(error);
    let errorMessage = "Could not create oauthClient";
    if (error.code === "ConditionalCheckFailedException") {
      errorMessage = "Account with this name already exists.";
    }
    return { error: errorMessage };
  }
}
