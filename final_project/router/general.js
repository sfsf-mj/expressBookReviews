const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {

  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (!doesExist(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

  //Write your code here
  res.send(JSON.stringify(books,null,4));

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  
    //Write your code here
    const isbn = req.params.isbn;
    res.send(books[isbn]);

  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  
    //Write your code here
    const author = req.params.author;

  // التأكد من أن books هي مصفوفة واستخدام filter للبحث عن الكتب التي كتبها المؤلف
//   if (Array.isArray(books)) {
    const booksByAuthor = books.filter((book) => book.author === author);

    if (booksByAuthor.length > 0) {
      res.send(booksByAuthor); // إرسال تفاصيل الكتب كاستجابة JSON
    } else {
      res.status(404).send('لم يتم العثور على كتب للمؤلف المحدد'); // إرسال استجابة 404 إذا لم يتم العثور على كتب
    }
//   } else {
//     res.status(500).send('Internal server error: books is not an array');
//   }
    
    //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
