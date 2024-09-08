import Book from "../models/book.model.js";
import mongoose from "mongoose";

// add a new book only accessed by the admin
export const addBook = async(req,res)=>{
  const {title,author,genre} = req.body;
  try {
    if(!title || !author || !genre){
      return res.status(400).json({code:0,message:"please fill all the fields"})
    }
    const checkBook = await Book.findOne({title:title});
    if(checkBook){
      return res.status(400).json({code:0,message:"book already exists, are you sure you want to add it?"})
    }
    const newBook = new Book({title,author,genre});
    await newBook.save();
    res.status(201).json({code:1,message:"book added successfully",data:newBook})
  } catch (error) {
    console.log(error);
    return res.status(500).json({code:0,message:"server error"});
  }
}
// update book details only accessed by the admin
export const updateBookDetails = async (req, res) => {
  const { id } = req.params;
  const { title, book, genre } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ code: 0, message: "Invalid book ID" });
    }
    let kitab = await Book.findById(id);

    if (!kitab) {
      return res.status(404).json({ code: 0, message: "Book not found" });
    }
    kitab = await Book.findByIdAndUpdate(
      id,
      {
        $set: {
          title: title || kitab.title,
          book: book || kitab.book,
          genre: genre || kitab.genre,
        },
      },
      { new: true } 
    );

    res.status(200).json({
      code: 1,
      message: "Book details updated successfully",
      data: kitab,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, message: "Server error" });
  }
};

// delete a book from the library
export const deleteBook  = async(req,res)=>{
  const {id} = req.params;
  try {
    let bookTodelete = await Book.findById(id);
    if(!bookTodelete) {
      return res.status(404).json({code:0,message:"book not found"})
    }
    bookTodelete = await Book.findByIdAndDelete(id);
    res.status(200).json({code:1,message:"book deleted successfully",data:bookTodelete})
  } catch (error) {
    console.log(error);
    return res.status(500).json({code:0,message:"server error"});
  }
}

// get books by the author name

export const getBookByAuthor = async(req,res)=>{
  const {author} = req.params;
  try {
    const books = await Book.find({author:author});
    if(!books){
      return res.status(404).json({code:0,message:"no books found by this author"})
    }
    res.status(200).json({code:1,message:"books found successfully",data:books})
  } catch (error) {
    console.log(error);
    return res.status(500).json({code:0,message:"server error"});
  }
}

// get all the books
export const getAllBooks = async(req,res)=>{
  try {
    const book = await Book.find();
    return res.status(200).json({code: 0,message: "boot found",data:book})

  } catch (error) {
    console.log(error);
    return res.status(500).json({code:0,message:"server error"});
  }
}

// get book by genre
export const getBookByGenre = async(req,res)=>{
  const {genre} = req.params;
  try {
    // if genre exist or not
    const book = await Book.findOne({genre: genre});
    return res.status(200).json({code:1,message: "books found",data: book})
  } catch (error) {
    console.log(error);
    return res.status(500).json({code:0,message:"server error"})
  }
}

// get book by title
export const getBookByTitle = async(req,res)=>{
  const {title} = req.params;
  try {
    const book = await Book.findOne({title: title});
    if(!book){
      return res.status(404).json({code:0,message:"no book found by this title"})
    }
    return res.status(200).json({code:1,message: "book found",data: book})
  } catch (error) {
    console.log(error);
    return res.status(500).json({code:0,message:"server error"})
  }
}
