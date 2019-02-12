// @ts-check

const handlers = require('./handlers')

/**
 * @param {import('express').Express} server
 * @returns {void}
 */
module.exports = (server) => {
  server.route('/s3').post(handlers.post)
  server.route('/s3statistic').post(handlers.postStatistics)
}
