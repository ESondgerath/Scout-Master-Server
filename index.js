require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const sequelize = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const user = require('./controllers/usercontroller');
const player = require('./controllers/playercontroller');
const headers = require('./middleware/headers');

app.use(cors());
app.use(bodyParser.json());
app.use(headers)

var logDirectory = path.join(__dirname, 'logs')

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

var accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory
})
//Rotating file logging

// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
// Single file logging

app.use(morgan('combined', {stream: accessLogStream}))

app.use('/user', user)
app.use('/player', player)

// app.get('/', function (req, res) {
//     res.send('hello, world!')
// })


sequelize.sync();

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}. Logging with Morgan Logger.`));