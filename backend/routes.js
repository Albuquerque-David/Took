const express = require('express');

const BookController = require('./src/database/controllers/BookController')

const routes = express.Router();

routes.post('/book',BookController.create)
routes.get('/book', BookController.readById)
routes.get('/books', BookController.readAll)
routes.get('/book', BookController.searchByName)
routes.put('/book', BookController.update)
routes.delete('/book/:id',BookController.delet);

module.exports = routes;