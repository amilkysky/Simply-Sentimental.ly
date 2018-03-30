const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const logger = require('morgan');
const http = require('http');
const { router } = require('./routes/index.js');
require('dotenv').config();

const app = express();

app
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

app
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, '../public/dist')))
  .use('/', router)

  .use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  })

  .use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });

const server = http.createServer(app);

server
  .listen(process.env.PORT);

server
  .on('listening', () => {console.log(`server listening on port ${process.env.PORT}`)})

  .on('error', (error) => {
    switch (error.code) {
      case 'EACCES':
        console.error(`Port ${process.env.PORT} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`Port ${process.env.PORT} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

module.exports = {
  app,
  server
};