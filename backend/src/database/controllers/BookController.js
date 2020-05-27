var mongoose = require("mongoose")
var { BookSchema } = require("../models/Book")
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

    console.log(newBook)

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

var update = async () => 
{

}

var read = async () =>
{

}

var delet = async () =>
{

}

module.exports = {create,update,read,delet}
