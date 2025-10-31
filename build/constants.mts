import { createRequire } from "node:module";
import { getDirname, joinPath, parseEnvFiles } from "nsuite";

export const MODE = process.env.MODE || "production";

const require = createRequire(import.meta.url);

const __dirname = getDirname(import.meta.url);
export const PATH_ROOT = joinPath(__dirname, "../");
export const PATH_SRC = joinPath(PATH_ROOT, "./src");
export const PATH_DIST = joinPath(PATH_ROOT, "./dist");
export const PATH_PUBLIC = joinPath(PATH_ROOT, "./public");
export const PATH_AIMIAN = joinPath(PATH_ROOT, "../../aimian");

parseEnvFiles([
  joinPath(PATH_AIMIAN, "./.env.local"),
  joinPath(PATH_AIMIAN, `./.env.${MODE}`),
  joinPath(PATH_AIMIAN, "./.env"),
]);

export const isDev = process.env.NODE_ENV !== "production";

const pkg = require(joinPath(PATH_ROOT, "package.json"));
export const pkgName = pkg.name;
export const pkgVersion = pkg.version;
export const buildDate = new Date().toISOString();
export const buildYear = new Date(buildDate).getFullYear();
export const FRONTEND_DOMAIN = isDev ? "http://127.0.0.1:9000" : "https://www.verybugs.com";
export const BACKEND_DOMAIN = isDev ? "http://127.0.0.1:9000" : "https://www.verysites.com";

export const QINIU_ACCESS_KEY = process.env.QINIU_ACCESS_KEY || "";
export const QINIU_SECRET_KEY = process.env.QINIU_SECRET_KEY || "";
export const QINIU_BUCKET_NAME = process.env.QINIU_BUCKET_NAME || "";
export const QINIU_PUBLIC_BUCKET_DOMAIN = process.env.QINIU_PUBLIC_BUCKET_DOMAIN || "";
