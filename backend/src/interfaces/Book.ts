import mongoose from 'mongoose'

interface Book extends mongoose.Document
{
    uuid: string,
    name: string,
    description: string,
};

export default Book;