const express = require('express');
const server = express();

const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publisher: "Scribner",
      genre: "Classic",
      publishYear: 1925,
      price: 12.99,
      imageUrl: "https://example.com/book1.jpg"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publisher: "Harper Collins",
      genre: "Fiction",
      publishYear: 1960,
      price: 10.99,
      imageUrl: "https://example.com/book2.jpg"
    },
    {
      id: 3,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publisher: "Allen & Unwin",
      genre: "Fantasy",
      publishYear: 1937,
      price: 14.99,
      imageUrl: "https://example.com/book3.jpg"
    },
    {
      id: 4,
      title: "1984",
      author: "George Orwell",
      publisher: "Secker & Warburg",
      genre: "Dystopian",
      publishYear: 1949,
      price: 9.99,
      imageUrl: "https://example.com/book4.jpg"
    },
    {
      id: 5,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      publisher: "Thomas Egerton",
      genre: "Romance",
      publishYear: 1813,
      price: 11.99,
      imageUrl: "https://example.com/book5.jpg"
    },
    {
      id: 6,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      publisher: "Little, Brown and Company",
      genre: "Coming of Age",
      publishYear: 1951,
      price: 8.99,
      imageUrl: "https://example.com/book6.jpg"
    },
    {
      id: 7,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      publisher: "George Allen & Unwin",
      genre: "Fantasy",
      publishYear: 1954,
      price: 19.99,
      imageUrl: "https://example.com/book7.jpg"
    },
    {
      id: 8,
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      publisher: "Bloomsbury",
      genre: "Fantasy",
      publishYear: 1997,
      price: 15.99,
      imageUrl: "https://example.com/book8.jpg"
    },
    {
      id: 9,
      title: "The Alchemist",
      author: "Paulo Coelho",
      publisher: "HarperOne",
      genre: "Philosophical",
      publishYear: 1988,
      price: 13.99,
      imageUrl: "https://example.com/book9.jpg"
    },
    {
      id: 10,
      title: "The Hunger Games",
      author: "Suzanne Collins",
      publisher: "Scholastic",
      genre: "Dystopian",
      publishYear: 2008,
      price: 12.49,
      imageUrl: "https://example.com/book10.jpg"
    }
]

server.use(express.json())

//get method
server.get('/books', function (req, res) {
    res.send(books)
  })

server.get('/books/:id', function (req, res) {
    const book = books.find(book => book.id === parseInt(req.params.id))
    if(!book){
        res.status(404).send('Not found')
    }else{
        res.send(book)
    }
})

//post method

server.post('/books', function(req,res){
    const newBook = req.body
    if(!newBook){
        res.status(400).send('Bad request')
    }
    newBook.id = books.length + 1;
    books.push(newBook);
    res.status(201).send('New book added');
})




//Patch method
server.patch('/books/:id', function(req, res) {
    const id = req.params.id;
    const updatedBook = req.body;
    const bookindex = books.findIndex(b => b.id === parseInt(id));
  
    if (bookindex !== -1) {
      const old = books[bookindex];
      books[bookindex] = {
        ...old,
        ...updatedBook
      };
      res.status(200).json(books[bookindex]); // Respond with the updated book
    } else {
      res.status(404).send('Not found');
    }
});
 

//Delete method
server.delete('/books/:id', function(req, res) {
    const id = req.params.id;
    const bookIndex = books.findIndex(b => b.id === parseInt(id));

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(200).send('Book deleted');
    } else {
        res.status(404).send('Not found');
    }
});


server.listen(2000)