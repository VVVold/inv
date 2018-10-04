const fs          = require('fs');
const http        = require('http');
const https       = require('https');
const express     = require('express');
const bodyParser  = require('body-parser');
const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const databaseValidatorService = require('./services/databaseValidators/_databaseValidatorService');

const app = express();

app.use(require('./middlewares/corsMiddleware'));

//todo need to change parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const models = require('./models');

models.sequelize.sync()
    .then(() => {
        console.log('sync success');
    })
    .catch(error => {
        console.log(error, 'something went wrong')
    });

require('./controllers/_routersLoader')(app);


const httpPort = 13000;
const httpsPort = 13001;

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

console.log('app is running http://localhost:13000/');

httpServer.listen(httpPort);
httpsServer.listen(httpsPort);

databaseValidatorService.runAllValidations().catch((e)=>{
    console.error('!!! VALIDATION PROCESS FAILED. STOPPING APPLICATION !!!', e);
    setTimeout(()=>{process.exit(1)},1000);
});

module.exports = app;