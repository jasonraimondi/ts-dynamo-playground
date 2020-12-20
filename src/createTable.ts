import { CreateTableCommand } from "@aws-sdk/client-dynamodb";

import { dbclient } from "~/dynamo";

// Set the parameters
const params = {
  TableName: process.env.TABLE_NAME,
  AttributeDefinitions: [
    {
      AttributeName: "PK",
      AttributeType: "S",
    },
    {
      AttributeName: "SK",
      AttributeType: "S",
    },
    {
      AttributeName: "GSI1PK",
      AttributeType: "S",
    },
    {
      AttributeName: "GSI1SK",
      AttributeType: "S",
    },
    {
      AttributeName: "GSI2PK",
      AttributeType: "S",
    },
    {
      AttributeName: "GSI2SK",
      AttributeType: "S",
    },
    {
      AttributeName: "GSI3PK",
      AttributeType: "S",
    },
    {
      AttributeName: "GSI3SK",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "PK",
      KeyType: "HASH",
    },
    {
      AttributeName: "SK",
      KeyType: "RANGE"
    },
  ],
  BillingMode: "PAY_PER_REQUEST",
  GlobalSecondaryIndexes: [
    {
      IndexName: "GSI1",
      KeySchema: [
        {
          AttributeName: "GSI1PK",
          KeyType: "HASH",
        },
        {
          AttributeName: "GSI1SK",
          KeyType: "RANGE",
        },
      ],
      Projection: {
        ProjectionType: "ALL",
      }
    },
    {
      IndexName: "GSI2",
      KeySchema: [
        {
          AttributeName: "GSI2PK",
          KeyType: "HASH",
        },
        {
          AttributeName: "GSI2SK",
          KeyType: "RANGE",
        },
      ],
      Projection: {
        ProjectionType: "ALL",
      }
    },
    {
      IndexName: "GSI3",
      KeySchema: [
        {
          AttributeName: "GSI3PK",
          KeyType: "HASH",
        },
        {
          AttributeName: "GSI3SK",
          KeyType: "RANGE",
        },
      ],
      Projection: {
        ProjectionType: "ALL",
      }
    },
  ],
};

export async function createTable() {
  try {
    const data = await dbclient.send(new CreateTableCommand(params));
    console.log("Table Created", data);
  } catch (err) {
    if (err.name === "ResourceInUseException") {
      console.log("Table already exists");
    } else {
      console.log("Error", err);
    }
  }
}
