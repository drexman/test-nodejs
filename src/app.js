
const express = require('express');
const bodyParser = require('body-parser');

const  app = express();
const router = express.Router();

// Carrega as Rotas
const customer_route = require('./routes/customer.route');
const user_route = require('./routes/user.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use('/', indexRoute);
app.use('/customer', customer_route);
app.use('/fileuser', user_route);

module.exports = app;