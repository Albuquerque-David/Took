const express = require('express');

const BookController = require('./src/controllers/crud/BookController')
const UserController = require('./src/controllers/crud/UserController')
const AuthController = require('./src/controllers/auth/AuthController')

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

routes.post('/login', AuthController.authUser)

module.exports = routes;