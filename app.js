const sequelize = require("./database/connexion");
const express = require('express');
var path = require('path');

const app = express();
sequelize.sync()

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use("/", require("./routes"));

module.exports = app;