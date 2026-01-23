import { google } from "googleapis";
import * as readline from "readline";
import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";

// Load environment variables from .env.local
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config(); // Fallback to .env
}

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly", "https://www.googleapis.com/auth/gmail.modify"];

async function authorize() {
  const checkEnv = (key: string) => {
    if (!process.env[key]) {
      console.error(`Error: ${key} is missing in .env.local used by this script.`);
      return false;
    }
    return true;
  };

  if (!checkEnv("GMAIL_CLIENT_ID") || !checkEnv("GMAIL_CLIENT_SECRET")) {
    console.log("\nPlease add GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET to your .env.local file first.");
    process.exit(1);
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "http://localhost:3000", // Redirect URI - can be localhost for this flow
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline", // Critical for refresh token
    scope: SCOPES,
    prompt: "consent", // Force consent to ensure refresh token is returned
  });

  console.log("\nAuthorize this app by visiting this url:\n");
  console.log(authUrl);
  console.log("\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the code from that page here: ", async (code) => {
    rl.close();
    try {
      const { tokens } = await oauth2Client.getToken(code);
      console.log("\nSuccessfully retrieved tokens!\n");
      console.log("Add this to your .env.local file:\n");
      console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`);

      if (!tokens.refresh_token) {
        console.warn(
          "\nWARNING: No refresh token returned. You might need to revoke access to the app in your Google Account permissions and try again, ensuring wait for the prompt to appear.",
        );
      }
    } catch (err) {
      console.error("Error retrieving access token", err);
    }
  });
}

authorize();
