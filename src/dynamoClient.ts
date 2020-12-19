import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const config = {
  region: "us-west-2",
  // endpoint: "http://localhost:8000",
};

export const dbclient = new DynamoDBClient(config);
