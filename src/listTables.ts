import { ListTablesCommand } from "@aws-sdk/client-dynamodb";

import { dbclient } from "~/dynamo";

export async function listTables() {
  try {
    const data = await dbclient.send(new ListTablesCommand({}));
    console.log(data.TableNames.join("\n"));
  } catch (err) {
    console.error(err);
  }
}

listTables();
