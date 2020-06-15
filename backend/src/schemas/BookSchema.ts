import mongoose from 'mongoose'

var BookSchema = new mongoose.Schema
({
    uuid: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
});

export default BookSchema;