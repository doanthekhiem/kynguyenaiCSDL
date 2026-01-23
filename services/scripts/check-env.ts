import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env");
const result = dotenv.config({ path: envPath });

const output = {
  cwd: process.cwd(),
  envPath,
  dotenvError: result.error ? result.error.message : null,
  perplexityKeyPresent: !!process.env.PERPLEXITY_API_KEY,
  perplexityKeyLength: process.env.PERPLEXITY_API_KEY ? process.env.PERPLEXITY_API_KEY.length : 0,
  gmailClientIdPresent: !!process.env.GMAIL_CLIENT_ID,
  envKeys: Object.keys(result.parsed || {}),
};

fs.writeFileSync("env_check_result.json", JSON.stringify(output, null, 2));
console.log("Env check done");
