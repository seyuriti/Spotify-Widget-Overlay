import { config as loadEnv } from "dotenv";
loadEnv()

const port = process.env.PORT || 8900;
const redirectUri = process.env.REDIRECT_URI?.replace('$', port);

if (
  process.env.CLIENT_ID === undefined ||
  process.env.CLIENT_SECRET === undefined
) {
  throw new Error("CLIENT_ID and CLIENT_SECRET must be provided");
}

export default {
  port,
  redirectUri,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
}