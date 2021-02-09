const express = require('express');
var cors = require('cors')

const app = express();

// app.use(require('./usuario'));
// app.use(require('./login'));
// app.use(require('./categoria'));
// app.use(require('./producto'));
// app.use(require('./upload'));
app.use(require('./email'));
app.use(require('./imagenes'));

app.use(cors());

module.exports = app;