import mongoose from 'mongoose'
import bcrypt from 'bcrypt';
import UserSchema  from '../../schemas/UserSchema'
import User from '../../interfaces/User'
import {Request, Response} from 'express'
import {compare} from 'bcrypt'


class AuthController {

    async hashPassword(password: String) 
    {
        let promise = new Promise((resolve, reject) => 
        {
            const saltRounds = 10
            bcrypt.genSalt(saltRounds, function(err, salt) 
            {
                bcrypt.hash(password, salt, function(err, hash) 
                {
                    resolve(hash);
                });
            });
        });
        return await promise
    }

    async authUser(request: Request, response: Response) 
    {
        var User = mongoose.model<User>('Users', UserSchema)
        let { email, password } = request.body
        User.findOne({email}).exec((error,result) =>
        {
            if(error)
                return response.status(200).json({message: error})
            if(result === null)
                return response.status(400).json({ message: 'Username or password is incorrect' })
            bcrypt.compare(password, result.password, (error, res) => {
                if(res)
                    return response.json({ result })
                else
                    return response.status(400).json({ message: 'Username or password is incorrect' })
            })
        })
    }
}

export default AuthController