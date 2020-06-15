import express from 'express';
import BookController from './src/controllers/crud/BookController'
import UserController from './src/controllers/crud/UserController'
import AuthController from './src/controllers/auth/AuthController'

const bookController = new BookController()
const userController = new UserController()
const authController = new AuthController()

const routes = express.Router();

routes.post('/book',bookController.create)
routes.get('/book', bookController.readById)
routes.get('/books', bookController.readAll)
routes.get('/book/:name', bookController.searchByName)
routes.put('/book', bookController.update)
routes.delete('/book/:id',bookController.delet);

routes.post('/user',userController.create)
routes.get('/user', userController.readById)
routes.get('/users', userController.readAll)
routes.put('/user', userController.update)
routes.delete('/user/:id',userController.delet);

routes.post('/login', authController.authUser)

module.exports = routes;