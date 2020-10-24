import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Create Schema and Model

const BookSchema = new Schema({
    title: String,
    pages: Njmber
});

const AuthorSchema = new Schema({
    name: String,
    age: Number,
    books: [BookSchema]
});

const Author = mongoose.model('author', AuthSchema);

export default Author;