import mongoose from 'mongoose'

interface User extends mongoose.Document
{
    uuid:  string,
    name: string,
    age: number,
    email: string,
    password: string,
};

export default User