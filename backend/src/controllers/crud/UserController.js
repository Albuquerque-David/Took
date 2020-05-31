//TODO: TRATAMENTO DE EXCESSÕES E RETORNO DE ERROS HTTP
//TODO: TRATAMENTO DE PERMISSÕES PRA FAZER AS MUDANÇAS


const mongoose = require("mongoose")
const { UserSchema } = require("../../domain/User")
const uuidModule = require('uuid')

var User = mongoose.model('Users', UserSchema)

var create = async (request, response) => 
{
    var { name, age, email, password } = request.body;

    const { hashPassword } = require("../auth/AuthController")
    password = await hashPassword(password)
    
    var uuid = uuidModule.v4();
    var newUser = new User({
        uuid,
        name,
        age,
        email,
        password
    })

    newUser.save((error) => 
        {
            if(error)
                console.log("Create error.")
            else
            {
                console.log("Sucessfully created new user.")
                response.json({ newUser })
            }
        }
    )
}

var update = async (request, response) => 
{
    var { id, name, age, email } = request.body

    const filter = { '_id': id }
    const update = { name , age, email}

    User.findOneAndUpdate(filter,update, {new: true}).exec((error, result) =>
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
    User.findById(id).exec((error,result) =>
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
    User.find({}).exec((error, result) => 
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

    User.findByIdAndDelete(id).exec((error, result) => 
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

module.exports = {create,update,readById,readAll,delet}
