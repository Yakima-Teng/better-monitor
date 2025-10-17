const path = require("path");
const pkg = require("../package.json");

const { resolve } = path;
const isDev = process.env.NODE_ENV !== "production";
const PROJECT_PATH = resolve(__dirname, "../");

const pkgName = pkg.name;
const pkgVersion = pkg.version;
const buildDate = new Date().toISOString();
const FRONTEND_DOMAIN = isDev ? "http://127.0.0.1:9000" : "https://www.verybugs.com";
const BACKEND_DOMAIN = isDev ? "http://127.0.0.1:9000" : "https://www.verysites.com";

module.exports = {
  PROJECT_PATH,
  resolve,
  isDev,
  pkg,
  pkgName,
  pkgVersion,
  buildDate,
  FRONTEND_DOMAIN,
  BACKEND_DOMAIN,
};
