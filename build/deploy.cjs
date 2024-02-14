/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
require('dotenv').config()
const { NodeSSH } = require('node-ssh')
const home = require('home')
/* eslint-enable @typescript-eslint/no-var-requires */

const {
  DEPLOY_PATH: subProjectRoot,
  DEPLOY_SSH_HOST,
  DEPLOY_SSH_PORT,
  DEPLOY_SSH_USERNAME
} = process.env

const ssh = new NodeSSH()
const join = (relativePath) => path.join(__dirname, '..', relativePath)

const putDirectory = async (fromDirectory, toDirectory) => {
  // Putting entire directories
  // const failed = []
  // const successful = []
  await ssh
    .putDirectory(fromDirectory, toDirectory, {
      recursive: true,
      concurrency: 10,
      // ^ WARNING: Not all servers support high concurrency
      // try a bunch of values and see what works on your server
      validate(itemPath) {
        const baseName = path.basename(itemPath)
        return (
          baseName.substr(0, 1) !== '.' // do not allow dot files
                    && baseName !== 'node_modules'
        ) // do not allow node_modules
      },
      tick(localPath, remotePath, error) {
        if (error) {
          // failed.push(localPath)
        } else {
          // successful.push(localPath)
        }
      }
    })
    .then((status) => {
      // eslint-disable-next-line no-console
      console.log(`transfer was ${
        status ? 'successful' : 'unsuccessful'
      }: [${fromDirectory} => ${toDirectory}]`)
      // console.log('failed transfers', failed.join(', '))
      // console.log('successful transfers', successful.join(', '))
    })
}

const execCommand = async (command) => {
  await ssh.execCommand(command, {
    cwd: subProjectRoot,
    onStdout(chunk) {
      // eslint-disable-next-line no-console
      console.log('onStdout')
      // eslint-disable-next-line no-console
      console.log(chunk.toString('utf8'))
    },
    onStderr(chunk) {
      // eslint-disable-next-line no-console
      console.log('onStderr')
      // eslint-disable-next-line no-console
      console.log(chunk.toString('utf8'))
      throw new Error('failed')
    }
  })
}

async function restart() {
  await ssh.connect({
    host: DEPLOY_SSH_HOST,
    port: Number(DEPLOY_SSH_PORT),
    username: DEPLOY_SSH_USERNAME,
    // 私钥路径（不使用私钥的话，把下面这行换成`password`字段，填SSH登录密码）
    privateKeyPath: path.join(home.resolve('~'), '.ssh/id_rsa')
  })

  // await execCommand(`rm -rf ${subProjectRoot}`)

  await putDirectory(join('/dist'), subProjectRoot)

  const singleFileList = [
    '/README.md'
  ].map((fileName) => ({
    local: join(fileName),
    remote: `${subProjectRoot}${fileName}`
  }))

  await ssh.putFiles(singleFileList).then(
    () => {
      // eslint-disable-next-line no-console
      console.log('The File thing is done')
    },
    (error) => {
      // eslint-disable-next-line no-console
      console.log("Something's wrong")
      // eslint-disable-next-line no-console
      console.log(error)
    }
  )

  await execCommand('pwd')
  // eslint-disable-next-line no-console
  console.log('发布结束')
  process.exit(0)
}

restart().catch((err) => {
  setTimeout(() => {
    throw err
  }, 0)
})
