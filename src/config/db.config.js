const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', error => {
  console.log(`Could not connect to the database: ${error}`)
})

db.on('connected', () => {
  console.log('Database Connection successful!')
})

module.exports = db
