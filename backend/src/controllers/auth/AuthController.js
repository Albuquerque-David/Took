const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const { UserSchema } = require("../../domain/User")



var hashPassword = async (password) => 
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

var authUser = async (request, response) => 
{
    var User = mongoose.model('Users', UserSchema)
    let { email, password } = request.body
    User.findOne({email}).exec((error,result) =>
    {
        if(error)
            console.log(error)
        else
        {
            if(result === null)
                response.status(400).json({ message: 'Username or password is incorrect' })
            else
            {                
                bcrypt.compare(password, result.password, (error, res) => {
                    if(res)
                        response.json({ result })
                    else
                        response.status(400).json({ message: 'Username or password is incorrect' })
                })
            }
        }
    })
}

module.exports = {authUser, hashPassword}