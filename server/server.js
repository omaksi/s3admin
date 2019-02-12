// @ts-check

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// const AWS = require('aws-sdk')

/* const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'myapp_test',
  },
  migrations: {
    tableName: 'migrations',
  },
}) */

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.json())

  server.get('/index', (req, res) => {
    return app.render(req, res, '/index', req.query)
  })

  require('./services/s3')(server)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(
    port,
    /** @param {Error} err */
    (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    }
  )
})
