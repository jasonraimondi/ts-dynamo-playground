import { createTable } from "./createTable";
import { listTables } from "./listTables";

createTable().then(async () => {
  await listTables();
});
