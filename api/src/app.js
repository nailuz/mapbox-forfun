const express = require('express');
const config = require('../config/config');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();

const empresasRoutes = require('./routes/empresas');

mongoose.connect(
    config.MONGO_URI_CONN,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    console.log("Mongoose connect");
}).catch((err) => {
    console.log("ERROR! Not Connected to mongoose.", err);
});

app.use(logger('dev'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});


app.use('/empresas', empresasRoutes);


app.use('*', (req, res) => {
    return res.status(404).send({
        mensagem: 'Método não encontrado.'
    })
});

module.exports = app;