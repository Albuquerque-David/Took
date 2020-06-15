import mongoose from 'mongoose'

var UserSchema = new mongoose.Schema
({
    uuid: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true}
});

export default UserSchema;