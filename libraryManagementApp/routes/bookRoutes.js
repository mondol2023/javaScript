const express = require ('express');
const router = express.router();
const bookModel = require('../model/book-model');

router.get('/books', async function(req, res) {
    const bookList = await book.find();
    console.log(bookList);
    res.send(bookList);
});

router.get('/books/:id', async function(req, res) {
    const { id } = req.params;
    try {
        const book = await Book.findOne({ isbn: parseInt(id) }); 
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send(book);
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/books', async function(req, res) {
    const {title, author, isbn, genre, price,available} = req.body;
    const bookExists = await book.findOne({isbn : isbn});

    if (bookExists) return res.send('Book already exists');
    const data = await book.create({title, author, isbn, genre, price, available});
    data.save();

    res.send("Book uploaded successfully");

});

router.put('/books/:id', async function(req, res) {
    const {id} = req.params;
    const {title, author, isbn, genre, price, available} = req.body;

    const bookExist = await bookModel.findOne({isbn : id});
    if (!bookExist) return res.send('Book Do Not exist');

    const updateField = (val, prev) => !val ? prev : val;
    const updatedBook = {
        ...bookExist ,
        title: updateField(title, bookExist.title),
        authors: updateField(authors, bookExist.authors),
        
    };
    await bookModel.updateOne({isbn: id},{$set :{title : updatedBook.title, author: updatedBook.authors}})
    
    res.status(200).send("Book Updated");
});
router.delete('/books/:id', async function (req, res) {
    const { id } = req.params;
    const bookExist = await book.findOne({isbn : id});
    if (!bookExist) return res.send('Book Do Not exist');
   await book.deleteOne({ isbn: id }).then(function(){
        console.log("Data deleted"); 
        res.send("Book Record Deleted Successfully")
    }).catch(function(error){
        console.log(error); 
    });
});


module.exports = router;