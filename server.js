const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const config = require('config')

var corsOptions = {
  origin: `http://${config.get('Cors.host')}:${config.get('Cors.port')}`
}

const app = express()

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require("./app/models")
const Role = db.role
const dbConnectionStirng = config.get('Mongoose.connectionString')

db.mongoose
  .connect(dbConnectionStirng, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.")
    initial()
  })
  .catch(err => {
    console.error("Connection error", err)
    process.exit()
  })

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

app.get("/", (req, res) => {
  res.json({ message: "Authentication API" })
})

const PORT = config.get('Port')
app.listen(PORT, () => {
  console.log(`API Server is running on port ${PORT}.`)
})

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err)
        }

        console.log("added 'user' to roles collection")
      })

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err)
        }

        console.log("added 'moderator' to roles collection")
      })

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err)
        }

        console.log("added 'admin' to roles collection")
      })
    }
  })
}