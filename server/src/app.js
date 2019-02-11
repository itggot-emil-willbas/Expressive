const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models') // Det finns en mapp som har index.js som returnerar ett objekt med attributet "sequelize"
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app) // Require routes file (en funktion), pass it (the argument) app (hela applikationen)

//  Connect sequelize to whatever db we  have it configured for.
sequelize.sync()
  .then(() => {
  //  When db i synced: start server!
    app.listen(process.env.PORT || 8081)
    console.log(`Server started on port ${config.port}`)
  })
