const qiniu = require('qiniu')
const fs = require('fs')
const path = require('path')

const cdnConfig = require('../app.config').cdn

const {
  ak,
  sk,
  bucket
} = cdnConfig

const mac = new qiniu.auth.digest.Mac(ak, sk);

var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;

const doUpload = (key, file) => {
  const options = {
    scope: bucket + ':' + key,
  };
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
      if (err) {
        return reject(err)
      }
      if (info.statusCode === 200) {
        resolve(body)
      } else {
        reject(body)
      }
    })
  })
}

const publicPath = path.join(__dirname, '../public')

// 这里用了个递归函数去循环, public目录, 判断依据是fs.lstatSync(path).isDirectory(), 判断路径是不是目录
const uploadAll = (dir, prefix) => {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const key = prefix ? `${prefix}/${file}` : file
    if (fs.lstatSync(filePath).isDirectory()) {
      return uploadAll(filePath, key)
    }
    doUpload(key, filePath)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.error(err)
      })
  })
}
uploadAll(publicPath)
