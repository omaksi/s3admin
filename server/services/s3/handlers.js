// @ts-check

const AWS = require('aws-sdk')

const { getBucketCountAndSize } = require('../../../utils/s3utils')

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  post: (req, res) => {
    console.log('POST handler')
    console.log(req.body)

    if (!req.body || !req.body.action || !req.body.accessKeyId || !req.body.secretAccessKey) {
      res.status(400).send(Error('bad request'))
    }

    const s3 = new AWS.S3({
      accessKeyId: req.body.accessKeyId,
      secretAccessKey: req.body.secretAccessKey,
    })
    // @ts-ignore
    s3[req.body.action](req.body.params, (err, data) => {
      if (err) {
        res.status(400).send(err)
        return
      }
      res.send(data)
    })
  },

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  postStatistics: async (req, res) => {
    console.log('POST handler')
    console.log(req.body)

    if (!req.body || !req.body.action || !req.body.accessKeyId || !req.body.secretAccessKey) {
      res.status(400).send(Error('bad request'))
    }

    const s3 = new AWS.S3({
      accessKeyId: req.body.accessKeyId,
      secretAccessKey: req.body.secretAccessKey,
    })

    const response = await getBucketCountAndSize(s3, req.body.params.Bucket)

    if (response) {
      res.send(response)
    }

    res.status(400).send('Fooo')
  },
}
