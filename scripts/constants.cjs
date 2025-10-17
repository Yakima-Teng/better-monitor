const path = require("path");
const pkg = require("../package.json");

const { resolve } = path;
const isDev = process.env.NODE_ENV !== "production";
const PROJECT_PATH = resolve(__dirname, "../");

const pkgName = pkg.name;
const pkgVersion = pkg.version;
const buildDate = new Date().toISOString();

module.exports = {
  PROJECT_PATH,
  resolve,
  isDev,
  pkg,
  pkgName,
  pkgVersion,
  buildDate,
};
