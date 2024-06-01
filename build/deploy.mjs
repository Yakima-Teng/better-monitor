import 'dotenv/config'
import path from 'path'
import url from 'url'
import { ssh } from 'better-deploy'

const {
  DEPLOY_PATH: subProjectRoot,
  DEPLOY_SSH_HOST,
  DEPLOY_SSH_PORT,
  DEPLOY_SSH_USERNAME,
  DEPLOY_SSH_PASSWORD
} = process.env

await ssh.connect({
  host: DEPLOY_SSH_HOST,
  port: Number(DEPLOY_SSH_PORT),
  username: DEPLOY_SSH_USERNAME,
  password: DEPLOY_SSH_PASSWORD
})

await ssh.putDirectory({
  fromPath: path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../dist'),
  toPath: subProjectRoot
})

process.exit(0)
