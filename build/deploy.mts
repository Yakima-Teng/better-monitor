import dotenv from "dotenv";
import path from "path";
import { qiniu } from "better-deploy";
import { pkg } from "#build/constant";

const { MODE } = process.env;

dotenv.config({
  path: ["../../.env", `../../.env.${MODE}`],
});

const {
  QINIU_ACCESS_KEY = "",
  QINIU_SECRET_KEY = "",
  QINIU_BUCKET_NAME = "",
  QINIU_ZONE_NAME = "",
  QINIU_PUBLIC_BUCKET_DOMAIN = "",
} = process.env;

const { name } = pkg;
const uploadRemotePrefix =
  MODE === "production" ? `verybugs/${name}/` : `verybugs-${MODE}/${name}/`;

const doTask = async () => {
  qiniu.initConfig({
    accessKey: QINIU_ACCESS_KEY,
    secretKey: QINIU_SECRET_KEY,
    bucketName: QINIU_BUCKET_NAME,
    zoneName: QINIU_ZONE_NAME as
      | "Zone_z0"
      | "Zone_cn_east_2"
      | "Zone_z1"
      | "Zone_z2"
      | "Zone_na0"
      | "Zone_as0",
    // CDN加速域名，以http开头
    publicBucketDomain: QINIU_PUBLIC_BUCKET_DOMAIN,
    // 最开头不要带/，末尾要带/，如果是根路径的话就传'/'
    uploadRemotePrefix,
  });

  // await qiniu.deleteRemotePathList(['verybugs/better-monitor/'])

  await qiniu.uploadDir({
    fromPath: path.resolve(__dirname, "../dist"),
    ignore: ["node_modules"],
    refresh: false,
    recursive: true,
  });

  await qiniu.refreshCDN([
    `${QINIU_PUBLIC_BUCKET_DOMAIN}/${uploadRemotePrefix}${name}.min.js`,
  ]);
};

doTask().catch((err) => {
  throw err;
});
