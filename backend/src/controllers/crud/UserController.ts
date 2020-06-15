//TODO: TRATAMENTO DE EXCESSÕES E RETORNO DE ERROS HTTP
//TODO: TRATAMENTO DE PERMISSÕES PRA FAZER AS MUDANÇAS


import mongoose from 'mongoose'
import UserSch from '../../schemas/UserSchema'
import User from '../../interfaces/User'
import { v4 } from 'uuid'
import {Request, Response} from 'express'
import AuthController from '../auth/AuthController'
var UserSchema = mongoose.model('Users', UserSch)
var authController = new AuthController();


class UserController {
    
    async create(request: Request, response: Response) 
    {
        var { name, age, email, password } = request.body;
    
        const { hashPassword } = require("../auth/AuthController")
        password = await authController.hashPassword(password)
        
        var uuid = v4();
        var newUser = new UserSchema({
            uuid,
            name,
            age,
            email,
            password
        })
    
        newUser.save((error) => 
            {
                if(error)
                    return console.log("Create error.")

                return response.json({ newUser })
                
            }
        )
    }
    
    async update(request: Request, response: Response)
    {
        var { id, name, age, email } = request.body
    
        const filter = { '_id': id }
        const update = { name , age, email}
    
        UserSchema.findOneAndUpdate(filter,update, {new: true}).exec((error, result) =>
        {
            if(error)
                return console.log(error)
            
            return response.json({result})
        })
    }
    
    async readById(request: Request,response: Response)
    {
        var { id } = request.query
        UserSchema.findById(id).exec((error,result) =>
        {
            if(error)
                return console.log(error)

            return response.json({ result })
        })
    }
    
    async readAll(request: Request, response: Response)
    {
        UserSchema.find({}).exec((error, result) => 
        {
            if(error)
                return console.log(error)

            return response.json({ result })
        })
    }
    
    async delet(request: Request, response: Response)
    {
        var { id } = request.params
    
        UserSchema.findByIdAndDelete(id).exec((error, result) => 
        {
            if(error)
                return console.log(error)

            return response.json({ result })
        })
    }
}

export default UserController