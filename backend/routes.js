const express = require('express');

const BookController = require('./src/controllers/BookController')
const UserController = require('./src/controllers/UserController')

const routes = express.Router();

routes.post('/book',BookController.create)
routes.get('/book', BookController.readById)
routes.get('/books', BookController.readAll)
routes.get('/book', BookController.searchByName)
routes.put('/book', BookController.update)
routes.delete('/book/:id',BookController.delet);

routes.post('/user',UserController.create)
routes.get('/user', UserController.readById)
routes.get('/users', UserController.readAll)
routes.put('/user', UserController.update)
routes.delete('/user/:id',UserController.delet);

module.exports = routes;