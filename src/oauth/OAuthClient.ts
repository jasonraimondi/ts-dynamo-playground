import { User } from "~/user/User";

export class OAuthClient {
  public identifier: string;
  public name: string;
  public secret?: string;
  public redirectUris: string[];
  public createdAt: Date;

  constructor({ identifier, name, secret, redirectUris, createdAt = new Date() }) {
    if (!identifier) {
      throw new Error("OAuthClient requires an id");
    }
    this.identifier = identifier;
    this.name = name;
    this.secret = secret;
    this.redirectUris = redirectUris;
    this.createdAt = createdAt;
  }

  static id(id: string) {
    return {
      "PK": { "S": `OAUTH_CLIENT#${id.toLowerCase()}`},
      "SK": { "S": `OAUTH_CLIENT#${id.toLowerCase()}`},
    };
  }

  key() {
    return OAuthClient.id(this.identifier)
  }


  gsi3pk() {
    return { "S": `OAUTH_CLIENT#${this.identifier.toLowerCase()}` };
  }

  gsi3() {
    return {
      "GSI3PK": this.gsi3pk(),
      "GSI3SK": { "S": `OAUTH_CLIENT#${this.identifier.toLowerCase()}` },
    };
  }


  toItem() {
    return {
      ...this.key(),
      ...this.gsi3(),
      "Type": { "S": "OAuthClient" },
      "Identifier": { "S": this.identifier },
      "Name": { "S": this.name },
      "Secret": { "S": this.secret },
      "RedirectUris": { "S": this.redirectUris.join(",") },
      "CreatedAt": { "S": this.createdAt.toISOString() },
    };
  }
}

export const clientFromItem = (item): OAuthClient => {
  if (item.Type.S !== "OAuthClient") {
    throw new Error("Not an oauth_client");
  }
  return new OAuthClient({
    identifier: item.Identifier.S,
    name: item.Name.S,
    secret: item.Secret.S,
    redirectUris: item.RedirectUris.S.split(","),
    createdAt: new Date(item.CreatedAt.S),
  });
};
