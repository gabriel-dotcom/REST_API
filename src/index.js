const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const rotaMaquinas = require('./routes/maquinas');


app.use(bodyParser.urlencoded({ extended: false })); //Para tratar json na url
app.use(bodyParser.json()); // Para receber json 

app.use('/maquinas', rotaMaquinas); // Definindo a rota de maquinas

app.listen(3000);

module.exports = app;