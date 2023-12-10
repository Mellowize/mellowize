import express from 'express'
import payload from 'payload'
import { jsxRenderer } from './util/render';
import path from 'path'

require('dotenv').config()
const app = express()

app.use(jsxRenderer({
  viewDir: path.resolve(__dirname, 'views')
}));

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET ?? 'payloadsecret',
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // front page
  app.get('/', async (req, res) => {
    res.jsx('HomePage')
  });

  // search results
  app.get('/search', async (req, res) => {
    res.jsx('SearchPage')
  });

  app.get('/:collection', (req, res, next) => {
    // check if collection exists
    const collection = payload.collections[req.params.collection];

    if (!collection) {
      return next();
    }

    res.jsx(`${capitalize(req.params.collection)}ArchivePage`, [`ArchivePage`])
  });

  app.get('/:collection/:post', (req, res, next) => {
    // check if collection exists
    const collection = payload.collections[req.params.collection];

    if (!collection) {
      return next();
    }

    res.jsx(`${capitalize(req.params.collection)}SinglePage`, [`SinglePage`])
  });

  // static files
  app.use(express.static('./public'))

  app.listen(3000)
}

start()
