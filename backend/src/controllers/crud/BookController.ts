//TODO: TRATAMENTO DE EXCESSÕES E RETORNO DE ERROS HTTP
//TODO: TRATAMENTO DE PERMISSÕES PRA FAZER AS MUDANÇAS


import mongoose from 'mongoose'
import BookSchema from '../../schemas/BookSchema'
import { v4 }  from 'uuid'
import {Request, Response} from 'express'

var Book = mongoose.model('Books', BookSchema)


class BookController {

    async create(request: Request, response: Response) 
    {
        var { name, description } = request.body;
        var uuid = v4()
        console.log(uuid)
        var newBook = new Book({
            uuid,
            name,
            description
        })

        newBook.save((error) => 
            {
                if(error)
                    console.log("Create error.")
                else
                {
                    console.log("Sucessfully created new book.")
                    response.json({ newBook })
                }
            }
        )
    }

    async update(request: Request, response: Response) 
    {
        var { id, name, description } = request.body

        const filter = { '_id': id }
        const update = { name , description}

        Book.findOneAndUpdate(filter,update, {new: true}).exec((error, result) =>
        {
            if(error)
                return console.log(error)

            response.json({result})
        })
    }

    async readById(request: Request,response: Response) 
    {
        var { id } = request.query
        Book.findById(id).exec((error,result) =>
        {
            if(error)
                return console.log(error)

            response.json({ result })
        })
    }

    async searchByName(request: Request, response: Response)
    {
        var { name } = request.params

        Book.find({'name': name}).exec((error, result) => 
        {
            if(error)
                return console.log(error)
            
            return response.json({ result })
        })
    }

    async readAll(request: Request, response: Response)
    {
        Book.find({}).exec((error, result) => 
        {
            if(error)
                return console.log(error)

            response.json({ result })
        })
    }

    async delet(request: Request, response: Response)
    {
        var { id } = request.params

        Book.findByIdAndDelete(id).exec((error, result) => 
        {
            if(error)
                return console.log(error)

            response.json({ result })
        })
    }
}

export default BookController
