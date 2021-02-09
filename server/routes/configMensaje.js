const express = require('express');
var cors = require('cors')

const nodemailer = require('nodemailer');

let app = express();

app.use(cors());

module.exports = (messageEmail) = async (req, empresa) => {

    if (empresa == "AntoGattiFotos") {
        return sendAntoGattiFotos(req);
    }

    if (empresa == "PrimeroDiesel") {
        return sendPrimeroDiesel(req);
    }

    if (empresa == "DieselMusso") {
        return sendDieselMusso(req);
    }
}

async function sendAntoGattiFotos(req) {

    const mailOptions = {
        from: `consultas@antogattifotos.com`,
        to: 'consultas@antogattifotos.com', // Cambia esta parte por el destinatario
        subject: 'Email Desde Pagina ',
        html: `<strong>Nombre:</strong> ${req.nombre}   <br/>
               <strong>Email:</strong> ${req.email} <br/>
               <strong>Mensaje:</strong> ${req.message}`
    };

    let resp = await wrapedSendMail(mailOptions);
    // lo or process resp;
    return resp;
}

async function sendPrimeroDiesel(req) {

    const mailOptions = {
        from: `consultas@PrimeroDiesel.com.ar`,
        to: 'consultas@PrimeroDiesel.com.ar', // Cambia esta parte por el destinatario
        subject: 'Email Desde Pagina ',
        html: `<strong>Nombre:</strong> ${req.nombre}   <br/>
               <strong>Email:</strong> ${req.email} <br/>
               <strong>Mensaje:</strong> ${req.message}`
    };

    let resp = await wrapedSendMailPrimeroDiesel(mailOptions);

    // lo or process resp;
    return resp;
}

async function sendDieselMusso(req) {

    const mailOptions = {
        from: `consultas@DieselMusso.com.ar`,
        to: 'consultas@DieselMusso.com.ar', // Cambia esta parte por el destinatario
        subject: 'Email Desde Pagina ',
        html: `<strong>Nombre:</strong> ${req.nombre}   <br/>
               <strong>Email:</strong> ${req.email} <br/>
               <strong>Mensaje:</strong> ${req.message}`
    };

    let resp = await wrapedSendMailDieselMusso(mailOptions);
    // lo or process resp;
    return resp;
}

async function wrapedSendMail(mailOptions) {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            pool: true,
            host: 'mail5016.site4now.net', //smtp.gmail.com  //in place of service use host...
            //secure: false, //true
            port: 465, //465
            auth: {
                user: 'consultas@antogattifotos.com',
                pass: 'AntoGattiFotos21*'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("error is " + error);
                reject(false); // or use rejcet(false) but then you will have to handle errors
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            }
        });
    })
};

async function wrapedSendMailPrimeroDiesel(mailOptions) {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            pool: true,
            host: 'mail5016.site4now.net', //smtp.gmail.com  //in place of service use host...
            //secure: false, //true
            port: 465, //465
            auth: {
                user: 'Consultas@primerodiesel.com.ar',
                pass: 'PrimeroDiesel2021*'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("error is " + error);
                resolve(false); // or use rejcet(false) but then you will have to handle errors
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            }
        });
    })
};

async function wrapedSendMailDieselMusso(mailOptions) {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            pool: true,
            host: 'mail5016.site4now.net', //smtp.gmail.com  //in place of service use host...
            //secure: false, //true
            port: 465, //465
            auth: {
                user: 'consultas@dieselmusso.com.ar',
                pass: 'DieselMusso2021*'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("error is " + error);
                resolve(false); // or use rejcet(false) but then you will have to handle errors
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            }
        });
    })
};