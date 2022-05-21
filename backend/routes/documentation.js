const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const route = require("express").Router();

route.use('/api-docs', swaggerUi.serve);
route.get('/api-docs', swaggerUi.setup(swaggerDocument));
route.get("/", (req, res) => {
    res.send("hello world");
})

module.exports = route;