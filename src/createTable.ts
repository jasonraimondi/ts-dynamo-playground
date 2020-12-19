import { CreateTableCommand } from "@aws-sdk/client-dynamodb";

import { dbclient } from "./dynamoClient";

// Set the parameters
const params = {
  AttributeDefinitions: [
    {
      AttributeName: "Season", //ATTRIBUTE_NAME_1
      AttributeType: "N", //ATTRIBUTE_TYPE
    },
    {
      AttributeName: "Episode", //ATTRIBUTE_NAME_2
      AttributeType: "N", //ATTRIBUTE_TYPE
    },
  ],
  KeySchema: [
    {
      AttributeName: "Season", //ATTRIBUTE_NAME_1
      KeyType: "HASH",
    },
    {
      AttributeName: "Episode", //ATTRIBUTE_NAME_2
      KeyType: "RANGE",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: "TABLE_NAME", //TABLE_NAME
  StreamSpecification: {
    StreamEnabled: false,
  },
};

export async function createTable() {
  try {
    const data = await dbclient.send(new CreateTableCommand(params));
    console.log("Table Created", data);
  } catch (err) {
    console.log("Error", err);
  }
}
