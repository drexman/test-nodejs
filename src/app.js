
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');

const  app = express();
const router = express.Router();

// Carrega as Rotas
const customer_route = require('./routes/customer.route');
const user_route = require('./routes/user.route');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const swaggerOptions = {
    swaggerDefinition: {
    openapi: "2.0",    
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API REST HTTP',
     
      contact : {
        name: "Samuel Toshikazu Oizume"
      }
     
    },

    servers: [{
        url: "http://localhost:3000/api/v1"
    }]
  },
  apis: ["/models/customer.js"]
};
  

// initialize swagger-jsdoc
var specs = swaggerJSDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve);
// serve swagger
app.get('/docs', swaggerUi.setup(specs, {
    explorer: true
  }));

/**
 * @swagger
 * /customer
 *  get:
 *     description: Customer para requisito
 */
app.use('/customer', customer_route);
app.use('/fileuser', user_route);
  
module.exports = app;