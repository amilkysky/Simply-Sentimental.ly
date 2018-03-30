require('dotenv').config()

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: ['knex', 'public']
})

const db = require('bookshelf')(knex)

db.plugin('registry')

module.exports.db = db
module.exports.knex = knex

const schema = require('./schema.js')