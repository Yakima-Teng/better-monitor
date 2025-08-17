import { parseEnvFiles, getDirname, joinPath } from 'nsuite'
import { qiniu } from "better-deploy";

const __dirname = getDirname(import.meta.url);

const { MODE } = process.env

parseEnvFiles([
  joinPath(__dirname, '../.env.local'),
  joinPath(__dirname, `../.env.${MODE}`),
  joinPath(__dirname, '../.env'),
])

const {
  QINIU_ACCESS_KEY = '',
  QINIU_SECRET_KEY = '',
  QINIU_ZONE_NAME = '',
  QINIU_BUCKET_NAME = '',
  QINIU_PUBLIC_BUCKET_DOMAIN = '',
  CDN_PREFIX = ''
} = process.env

const publicBucketDomain = QINIU_PUBLIC_BUCKET_DOMAIN

qiniu.initConfig({
  accessKey: QINIU_ACCESS_KEY,
  secretKey: QINIU_SECRET_KEY,
  bucketName: QINIU_BUCKET_NAME,
  zoneName: QINIU_ZONE_NAME as QiniuZoneName,
  // CDN加速域名，以http开头
  publicBucketDomain,
  // 最开头不要带/，末尾要带/，如果是根路径的话就传'/'
  uploadRemotePrefix: `${CDN_PREFIX}/`,
});

await qiniu.deleteRemotePathList(["assets/"]);

const uploadedItems = await qiniu.uploadDir({
  fromPath: joinPath(__dirname, '../dist'),
  ignore: ["node_modules"],
  refresh: false,
  recursive: true,
});

const urlsToRefresh = uploadedItems.map((item) => {
  return `${publicBucketDomain}/${item.key}`
})

// eslint-disable-next-line no-console
console.log('Refreshing urls', urlsToRefresh)

await qiniu.refreshCDN([
  ...urlsToRefresh
]);
