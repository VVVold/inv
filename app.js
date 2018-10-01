const fs          = require('fs');
const http        = require('http');
const https       = require('https');
const logger      = require('morgan');
const express     = require('express');
const bodyParser  = require('body-parser');
const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const app = express();

app.use(logger('dev'));
app.use(require('./middlewares/corsMiddleware'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const models = require('./models');

models.sequelize.sync().then(() => {
    console.log('sync success');
}).catch(error => {
    console.log(error, 'something went wrong')
});

require('./controllers/routersLoader')(app);


const httpPort = 13000;
const httpsPort = 13001;

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(httpPort);
httpsServer.listen(httpsPort);

module.exports = app;
