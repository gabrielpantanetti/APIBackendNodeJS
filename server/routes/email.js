const express = require('express');
var cors = require('cors')

const configMensaje = require('./configMensaje');

let app = express();

app.use(cors());

app.post('/email', (req, res) => {

    configMensaje(req.body, "AntoGattiFotos").then(() => {
        var message = 'Se envio con exito';
        res.status(200).send();

    }).catch((error) => {
        res.status(500).send(error);
    });
})

app.post('/SendEmailPrimeroDiesel', (req, res) => {   

    configMensaje(req.body, "PrimeroDiesel").then(() => {
        var message = 'Se envio con exito';
        res.status(200).send();

    }).catch((error) => {
        res.status(500).send(error);
    });
})

app.post('/SendEmailDieselMusso', (req, res) => {

    configMensaje(req.body, "DieselMusso").then(() => {
        var message = 'Se envio con exito';
        res.status(200).send();

    }).catch((error) => {
        res.status(500).send(error);
    });
})

module.exports = app;