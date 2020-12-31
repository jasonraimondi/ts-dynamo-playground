import "tsconfig-paths/register";
import "dotenv/config";

import { createUser } from "~/user/createUser";
import { User } from "~/user/User";
import { createTable } from "~/createTable";
import { getUser } from "~/user/getUser";
import { createOAuthClient } from "~/oauth/createOAuthClient";
import { OAuthClient } from "~/oauth/OAuthClient";
import { getOAuthClient } from "~/oauth/getOAuthClient";

const sleep = (s) => new Promise(resolve => setTimeout(resolve, s * 1000));

(async () => {
  // await createTable();
  // console.log("sleeping...");
  // await sleep(20);

  await createUser(
    new User({ email: "jason@examaple.com", username: "jasonraimondi", name: "Jason Raimondi" }),
    new User({ email: "kimberly@examaple.com", username: "kimberlyraimondi", name: "Kimberly Raimondi" }),
    new User({ email: "ruby@examaple.com", username: "rubyraimondi", name: "Ruby Raimondi" }),
  );
  await createOAuthClient(
    new OAuthClient({ identifier: "abc123", name: "something", redirectUris: ["localhost:8080"], secret: "jasonraimondi" }),
  );

  await sleep(5);


  let start = Date.now();
  console.log(await getUser("jasonraimondi"));
  console.log(`MS: ${Date.now() - start}`)

  start = Date.now();
  console.log(await getUser("kimberlyraimondi"));
  console.log(`MS: ${Date.now() - start}`)

  start = Date.now();
  console.log(await getOAuthClient("abc123"));
  console.log(`MS: ${Date.now() - start}`)

  start = Date.now();
  console.log(await getOAuthClient("doesnotexist"));
  console.log(`MS: ${Date.now() - start}`)

  start = Date.now();
  console.log(await getUser("doesnotexist"));
  console.log(`MS: ${Date.now() - start}`)
})();
