const express = require('express');
const routes = require('./routes');
const mongoConnect = require('./src/database/connection');

const app = express();

mongoConnect.connect();

app.use(express.json());

app.use(routes);

app.listen(3333);