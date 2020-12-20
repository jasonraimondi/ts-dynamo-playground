import "tsconfig-paths/register";
import "dotenv/config";

import { createUser } from "~/user/createUser";
import { User } from "~/user/user";
import { createTable } from "~/createTable";

(async () => {
  await createTable();
  await createUser(
    new User({ email: "jason@examaple.com", username: "jasonraimondi", name: "Jason" }),
    new User({ email: "kimberly@examaple.com", username: "kimberlyraimondi", name: "Kimberly" }),
    new User({ email: "ruby@examaple.com", username: "rubyraimondi", name: "Ruby" }),
  );
})();
