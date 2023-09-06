require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const router = require('./controllers/calculation.controller')
require('./config/db.config')

const app = express()
const port = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())
app.use(helmet())

app.use('/api/calculation', router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
