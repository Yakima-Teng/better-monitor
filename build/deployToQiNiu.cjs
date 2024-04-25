/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const qiniu = require('qiniu')
require('dotenv').config()
/* eslint-enable @typescript-eslint/no-var-requires */

const {
  QI_NIU_PUBLIC_BUCKET_DOMAIN: publicBucketDomain,
  QI_NIU_BUCKET_NAME: bucket,
  QI_NIU_ACCESS_KEY: accessKey,
  QI_NIU_SECRET_KEY: secretKey
} = process.env

/**
 * 七牛接口文档：https://developer.qiniu.com/kodo/1289/nodejs#rs-delete
 */
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const config = new qiniu.conf.Config()
// 空间对应的机房（华东）
config.zone = qiniu.zone.Zone_z0
const bucketManager = new qiniu.rs.BucketManager(mac, config)

// 获取公开空间访问链接
const getPublicDownloadUrl = (key) => {
  return bucketManager.publicDownloadUrl(
    publicBucketDomain,
    key
  )
}

// 上传本地文件到七牛云
const uploadLocalFileToQiNiu = async (localFilePath) => {
  return new Promise((resolve, reject) => {
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    // 这里直接取文件名作为key
    const fileName = localFilePath.split(/[\\/]/).reverse()[0]
    const key = `verybugs/${fileName}`

    const options = {
      // 指定了key，就可以支持覆盖上传
      scope: `${bucket}:${key}`
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)
    // 文件上传
    formUploader.putFile(uploadToken, key, localFilePath, putExtra, (
      respErr,
      respBody
    ) => {
      if (respErr) {
        reject(respErr)
        return
      }
      resolve(respBody)
    })
  })
}

// 刷新链接，单次请求链接不可以超过100个，如果超过，请分批发送请求
const refreshCDN = async (refreshUrl) => {
  const cdnManager = new qiniu.cdn.CdnManager(mac)
  // URL 列表
  const urlsToRefresh = [refreshUrl]
  return new Promise((resolve, reject) => {
    cdnManager.refreshUrls(urlsToRefresh, (err, respBody, respInfo) => {
      if (err) {
        reject(err)
        return
      }
      resolve(respBody, respInfo)
    })
  })
}

const doTask = async () => {
  const sdkFilePath = path.resolve(__dirname, '../dist/better-monitor.min.js')
  const res = await uploadLocalFileToQiNiu(sdkFilePath)
  if (typeof res?.key !== 'string') {
    throw new Error('Failed to upload sdk file to qiniu!')
  }
  const downloadUrl = getPublicDownloadUrl(res.key)
  await refreshCDN(downloadUrl)
  return downloadUrl
}

doTask()
  .then((downloadUrl) => {
    // eslint-disable-next-line no-console
    console.log(`Upload sdk file to qiniu and refresh CDN successfully: ${downloadUrl}`)
  })
  .catch((err) => {
  // eslint-disable-next-line no-console
    console.log(err)
  })
