const express = require('express');
var cors = require('cors')

const fs = require('fs');
const path = require('path');

const {
    verificaTokenImg
} = require('../middlewares/autenticacion');

let app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/imagen/:folder/:img', (req, res) => {

    let folder = req.params.folder;
    let ext = req.params.img;

    var hostName = req.protocol + '://' + req.get('host');

    let url = `assets/images/${ folder }/`;
    let urlOrigin = hostName + '/' + url;
    let urlCompleta = '../../public/' + url;

    let pathImagen = path.resolve(__dirname, urlCompleta);

    var returnFiles = fromDir(pathImagen, '.' + ext, urlOrigin);

    if (fs.existsSync(pathImagen)) {
        res.jsonp(returnFiles);
    } else {
        let noImagePath = path.resolve(__dirname, '/assets/no-image.jpg');

        res.jsonp(returnFiles);
    }
});

app.get('/imagen/:folder/:subfolder/:img', (req, res) => {

    let folder = req.params.folder;
    let subfolder = req.params.subfolder;
    let ext = req.params.img;

    var hostName = req.protocol + '://' + req.get('host');

    let url = `assets/images/${ folder }/${ subfolder }/`;
    let urlOrigin = hostName + '/' + url;
    let urlCompleta = '../../public/' + url;

    let pathImagen = path.resolve(__dirname, urlCompleta);

    var returnFiles = fromDir(pathImagen, '.' + ext, urlOrigin);

    if (fs.existsSync(pathImagen)) {
        res.jsonp(returnFiles);
    } else {
        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');

        res.jsonp(returnFiles);
    }
});

function fromDir(startPath, filter, urlOrigin) {

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath).sort();
    var returnFiles = [];
    var json = {};

    for (var i = 0; i < files.length; i++) {

        var filename = files[i];

        var urlPath = path.join(startPath, files[i]);

        var stat = fs.lstatSync(urlPath);

        if (stat.isDirectory()) {
            fromDir(urlPath, urlOrigin); //recurse
        } else {

            json = {};
            json.Filename = filename;
            json.Path = urlOrigin + '/' + filename;;

            returnFiles.push(json);
        };
    };

    return returnFiles;
};

module.exports = app;