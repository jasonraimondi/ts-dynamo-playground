import "tsconfig-paths/register";
import "dotenv/config";

import { createTable } from "~/createTable";
import { listTables } from "~/listTables";
import { putItem } from "~/putItem";

createTable().then(async () => {
  await listTables();
  await putItem();
});
