const bodyParser = require('body-parser');
const logger     = require('morgan');
const http       = require('http');
var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var express = require('express');


const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const models = require('./models');

models.sequelize.sync().then(() => {
    console.log('sync success');
}).catch(error => {
    console.log(error, 'something went wrong')
});

require('./routes')(app);

const port = parseInt(process.env.PORT, 10) || 13000;
app.set('port', port);

const server = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

server.listen(port);
httpsServer.listen(13001);

module.exports = app;
