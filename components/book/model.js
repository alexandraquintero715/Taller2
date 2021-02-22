const mongoose = require('mongoose')


const bookSchema = new mongoose.Schema({
  cover: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  unitValue: { type: Number, required: true, min: 0 },
  categories: { type: Array, required: false }
})

const Book = mongoose.model('books', bookSchema)

module.exports = Book


