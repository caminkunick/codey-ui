import { signInWithCustomToken, UserCredential } from "firebase/auth";
import { auth } from "./firebase";

export class DiscordDev {
  static hashEncode(
    hash: string
  ): Record<"token_type" | "access_token" | "expires_in" | "scope", string> {
    const data = hash
      .slice(1)
      .split("&")
      .map((row) => row.split("="))
      .reduce<
        Record<"token_type" | "access_token" | "expires_in" | "scope", string>
      >((data, [key, value]) => Object.assign(data, { [key]: value }), {
        token_type: "",
        access_token: "",
        expires_in: "",
        scope: "",
      });
    return data;
  }

  static genURL(): string {
    if (!process.env.REACT_APP_DISCORD_ID) {
      throw new Error("REACT_APP_DISCORD_ID not found");
    }
    if (!process.env.REACT_APP_SITE_URL) {
      throw new Error("REACT_APP_SITE_URL not found");
    }
    // return `https://discord.com/api/oauth2/authorize?client_id=1045543753814909049&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify%20email`;
    return `https://discord.com/api/oauth2/authorize?client_id=${
      process.env.REACT_APP_DISCORD_ID
    }&redirect_uri=${encodeURIComponent(
      window.location.origin + "/signin"
    )}&response_type=token&scope=identify%20email`;
  }

  static signIn(token: string) {
    return new Promise<UserCredential>((resolve, reject) => {
      fetch(`https://codey.okkc.in/api/discord/signin/${token}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.customToken) {
            signInWithCustomToken(auth, res.customToken).then((user) =>
              resolve(user)
            );
          } else {
            throw new Error("Unknown Error");
          }
        })
        .catch(reject);
    });
  }
}
