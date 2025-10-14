import { rm } from "node:fs/promises";
import { createRequire } from "node:module";
import {
  parseEnvFiles,
  getDirname,
  joinPath,
  getConfigFromQiniuOSS,
  getMacFromQiniuOSS,
  uploadDirToQiniuOSS,
  refreshUrlsFromQiniuOSS,
  deleteRemotePathListFromQiniuOSS,
  getBucketManagerFromQiniuOSS,
  logInfo,
  logError,
} from 'nsuite'

const require = createRequire(import.meta.url);
const pkg = require('../package.json');
const appName = pkg.name;

const __dirname = getDirname(import.meta.url);
const pathDist = joinPath(__dirname, '../dist');

const { MODE } = process.env

parseEnvFiles([
  joinPath(__dirname, '../../aimian/.env.local'),
  joinPath(__dirname, `../../aimian/.env.${MODE}`),
  joinPath(__dirname, '../../aimian/.env'),
])

const {
  QINIU_ACCESS_KEY = '',
  QINIU_SECRET_KEY = '',
  QINIU_BUCKET_NAME = '',
  QINIU_PUBLIC_BUCKET_DOMAIN = '',
  CDN_PREFIX = ''
} = process.env

const CDN_PATH_PREFIX = new URL(CDN_PREFIX).pathname.replace(/\//g, "");
async function deployFilesToCDN() {
  const config = getConfigFromQiniuOSS({})
  const mac = getMacFromQiniuOSS({
    accessKey: QINIU_ACCESS_KEY,
    secretKey: QINIU_SECRET_KEY,
  })
  const baseUrl = QINIU_PUBLIC_BUCKET_DOMAIN
  const keyPrefix = `${CDN_PATH_PREFIX}/${appName}`

  // 如果是非正式环境，每次发布前先删除之前的文件，以节省空间
  if (MODE !== "production") {
    const bucketManager = getBucketManagerFromQiniuOSS({
      config,
      mac,
    });

    await deleteRemotePathListFromQiniuOSS({
      bucketManager,
      bucket: QINIU_BUCKET_NAME,
      remotePathList: [keyPrefix],
    });
  }

  const { uploadedList } = await uploadDirToQiniuOSS({
    config,
    mac,
    bucket: QINIU_BUCKET_NAME,
    baseUrl,
    keyPrefix,
    putPolicyOptions: {},
    localPath: pathDist,
    ignorePathList: ["node_modules"],
    refresh: false,
    recursive: true,
    dryRun: false,
    uploadCallback: ({ err, curIdx, total, file }) => {
      if (err) {
        logError(`Failed uploadLocalFileToQiniuOSS, err: ${err.message}`);
        return;
      }
      logInfo(
        `[${curIdx + 1}/${total}]: Uploaded ${file.name} => ${file.url}`,
      );
    },
  });

  // 正式环境增加强制刷新缓存逻辑
  if (MODE === "production") {
    const urlsToRefresh = uploadedList
      .filter((item) => {
        return (
          item.key.endsWith(".js")
        );
      })
      .map((item) => item.url);
    logInfo(`Start refreshing CDN: ${urlsToRefresh.join(", ")}.`);
    const refreshedUrls = await refreshUrlsFromQiniuOSS({
      mac,
      urls: [
        ...urlsToRefresh,
      ],
    }).catch((err) => {
      logError("Failed to refresh urls in deploy-app", err);
      return [] as string[];
    });
    logInfo(`Refreshed urls: ${refreshedUrls.join(", ")}.`);
  }
}
try {
  await deployFilesToCDN()
} catch (err: unknown) {
  logError(`Failed to deploy files to CDN for app: ${appName}, err: ${err instanceof Error ? err.message : String(err)}`)
  process.exit(1)
}

await rm(pathDist, { recursive: true, force: true })

logInfo(`Deployed successfully for app: ${appName}`)

process.exit(0)
