import "tsconfig-paths/register";
import "dotenv/config";

import { createUser } from "~/user/createUser";
import { User } from "~/user/user";
import { createTable } from "~/createTable";
import { getUser } from "~/user/getUser";

(async () => {
  // await createTable();
  await createUser(
    new User({ email: "jason@examaple.com", username: "jasonraimondi", name: "Jason Raimondi" }),
    new User({ email: "kimberly@examaple.com", username: "kimberlyraimondi", name: "Kimberly Raimondi" }),
    new User({ email: "ruby@examaple.com", username: "rubyraimondi", name: "Ruby Raimondi" }),
  );
  console.log(await getUser("jasonraimondi"));
  console.log(await getUser("kimberlyraimondi"));
  console.log(await getUser("doesnotexist"));
})();
