const bodyParser = require('body-parser');
const express    = require('express');
const logger     = require('morgan');
const http       = require('http');

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
server.listen(port);

module.exports = app;
