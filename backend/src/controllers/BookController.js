//TODO: TRATAMENTO DE EXCESSÕES E RETORNO DE ERROS HTTP
//TODO: TRATAMENTO DE PERMISSÕES PRA FAZER AS MUDANÇAS


var mongoose = require("mongoose")
var { BookSchema } = require("../domain/Book")
const uuidModule = require('uuid')

var Book = mongoose.model('Books', BookSchema)

var create = async (request, response) => 
{
    var { name, description } = request.body;
    var uuid = uuidModule.v4();
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

var update = async (request, response) => 
{
    var { id, name, description } = request.body

    const filter = { '_id': id }
    const update = { name , description}

    Book.findOneAndUpdate(filter,update, {new: true}).exec((error, result) =>
    {
        if(error)
            console.log(error)
        else
        {  
            console.log(result)
            response.json({result})
        }
    })
}

var readById = async (request,response) => 
{
    var { id } = request.query
    Book.findById(id).exec((error,result) =>
    {
        if(error)
            console.log(error)
        else
        {
            console.log(result)
            response.json({ result })
        }
    })
}

var searchByName = async (request, response) =>
{
    var { name } = request.query

    Book.find({'name': name}).exec((error, result) => 
    {
        if(error)
            console.log(error)
        else
        {
            console.log(result)
            response.json({ result })
        }
    })
}

var readAll = async (request, response) =>
{
    Book.find({}).exec((error, result) => 
    {
        if(error)
            console.log(error)
        else
        {
            console.log(result)
            response.json({ result })
        }
    })
}

var delet = async (request, response) =>
{
    var { id } = request.params

    Book.findByIdAndDelete(id).exec((error, result) => 
    {
        if(error)
            console.log(error)
        else
        {
            console.log(result)
            response.json({ result })
        }
    })
}

module.exports = {create,update,readById,searchByName,readAll,delet}
