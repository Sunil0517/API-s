import express from "express";
import mongoose from "mongoose";
import yup from 'yup';
const server = express();
server.use(express.json());

const bookSchema = yup.object().shape({
    title: yup.string().required(),
    author: yup.string().required(),
    publisher: yup.string().required(),
    genre: yup.string().required(),
    publishYear: yup.number().required().positive().integer(),
    price: yup.number().required().positive(),
    imageUrl: yup.string().url().required(),
});


const dbURI = 'mongodb+srv://Sunil7717:HI90HMLOEfsYF4Cb@cluster0.jcqftcr.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result) => console.log('Connected to database'))
.catch((err) => console.log('Error connecting to database', err));

const Book = mongoose.model('Book', {
    title: String,
    author: String,
    publisher: String,
    genre: String,
    publishYear: Number,
    price: Number,
    imageUrl: String,
});

//post method
server.post('/books', async (req, res) => {
    try {
      const newBook = new Book(req.body);
      await bookSchema.validate(newBook, { abortEarly: false }); 
      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

//get method
server.get('/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

//get method by id
server.get('/books/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
      } else {
        res.status(200).json(book);
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

//patch method
server.patch('/books/:id', async (req, res) => {
    try {
      const updatedBook = req.body;
      await bookSchema.validate(updatedBook, { abortEarly: false }); // Validate using Yup schema
      const book = await Book.findByIdAndUpdate(req.params.id, updatedBook, {
        new: true, // Return the updated book
      });
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
      } else {
        res.status(200).json(book);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

//delete method
server.delete('/books/:id', async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
      } else {
        res.status(204).send(); // No content on successful deletion
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });



server.listen(2000);
