import { parseEnvFiles, getDirname, joinPath } from "nsuite";
import { execSync } from "child_process";

const __dirname = getDirname(import.meta.url);
const envPath = joinPath(__dirname, "../../tech/.env");

const { parsed } = parseEnvFiles([envPath]);
const NPM_TOKEN = parsed?.NPM_TOKEN || "";
if (!NPM_TOKEN) {
  throw new Error(`No NPM_TOKEN detected!`);
}

process.env.NPM_TOKEN = NPM_TOKEN;
execSync(
  `npm config set //registry.npmjs.org/:_authToken=${NPM_TOKEN} && npm publish --registry=https://registry.npmjs.org/ --auth-type=legacy`,
  {
    stdio: "inherit",
    env: process.env,
  },
);
