require('dotenv').config()

const pg = require('pg');
pg.defaults.ssl = true;

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: ['knex', 'public']
})

const db = require('bookshelf')(knex)

db.plugin('registry')

module.exports.db = db
module.exports.knex = knex

require('./schema.js')