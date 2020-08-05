const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('config')


const applicationPort = config.get('Port')
const accessTokenSecret = config.get('AccessTokenSecret');

const app = express();

mongoose.connect(`mongodb://${config.get('Mongoose.dbConfig.host')}
    :${config.get('Mongoose.dbConfig.port')}
    /${config.get('Mongoose.dbConfig.dbName')}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

app.use(bodyParser.json())

app.post('/login', (req, res) => {
    const { username, password } = req.body


    const user = users.find(u => { return u.username === username && u.password === password })

    if (user) {
        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret)

        res.json({
            accessToken
        })
    } else {
        res.send('Username or password incorrect')
    }
})

app.listen(applicationPort, () => {
    console.log('Authentication service started on port ' + applicationPort)
})
