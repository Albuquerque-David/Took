const express = require('express');

const BookController = require('./src/database/controllers/BookController')

const routes = express.Router();

routes.post('/books',BookController.create)

module.exports = routes;