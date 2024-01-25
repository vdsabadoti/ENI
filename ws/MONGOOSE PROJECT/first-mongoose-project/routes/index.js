const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//CASE 1 (OK) => BOOK : ALL IN THE SAME FILE (SCHEMA AND MODEL)
//SCHEMA :
const BookSchema = new Schema({
  uuid: { type: String, required: true },
  title: { type: String, required: true },
  year: { type: Number, required: true },
  synopsis: { type: String},
  author: { type: Schema.Types.ObjectId, ref: "Author", required: false },
  genre: { type: Schema.Types.ObjectId, ref: "Genre", required: false },
  review: [{ type: Schema.Types.ObjectId, ref: "Review", required: false }],
});
//MODEL :
const Book = mongoose.model("Book", BookSchema);

//CASE 2 (OK) => IMPORT SCHEMA FROM ANOTHER FILE
//SCHEMA :
const { AuthorSchema } = require("../services/models");
//MODEL :
const Author = mongoose.model("Author", AuthorSchema);

//CASE 3 (OK) => GENRE and REVIEW : IMPORT MODEL FROM ANOTHER FILE
//SCHEMA AND MODEL :
const { Genre } = require("../services/models");
const { Review } = require("../services/models");

const express = require("express");
const router = express.Router();
const uuid = require("uuid");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect('/allbooks')
});

//GENRES START------------------------------------------------------------------//
router.get("/newgenre", function (req, res, next) {
    res.render("new-genre");
});

router.post("/newgenre", async function (req, res) {
  console.log('Body of request :');
  console.log(req.body);
  console.log('label of request :');
  console.log(req.body.label);

    const newGenreFromForm = new Genre({
      uuid: uuid.v4(),
      label: req.body.label,
    });

    await newGenreFromForm.save();

    res.redirect('/newbook');
});
//GENRES END-------------------------------------------------------------------//

//AUTHORS START----------------------------------------------------------------//
router.get("/newauthor", function (req, res, next) {
    res.render("new-author");
});

router.post("/newauthor", async function (req, res) {
  console.log('Body of request :');
  console.log(req.body);
  console.log('author of request :');
  console.log(req.body.authorLanguage);

    const newAuthorFromForm = new Author({
      uuid: uuid.v4(),
      firstName: req.body.authorName,
      lastName: req.body.authorLastName,
      language: req.body.authorLanguage,
    });

    await newAuthorFromForm.save();

    res.redirect('/newbook');
});
//AUTHORS END----------------------------------------------------------------//


//BOOKS START----------------------------------------------------------------//
router.get("/newbook", async function (req, res, next) {
  let genres = await Genre.find({});
  let authors = await Author.find({});
  console.log(authors);
  res.render("new-book", { title: "Express", genres: genres, authors : authors });
});

router.post("/newbook", async function (req, res) {
  console.log('Body of request :');
  console.log(req.body);
  console.log('Genre of request :');
  console.log(req.body.genre);
  const newStandardBook = new Book({
    uuid: uuid.v4(),
    title: "Le monde comme volonté et répresentation, tomme I",
    year: 1873,
  });

  const newStandardAuthor = new Author({
    uuid: uuid.v4(),
    firstName: "Arthur",
    lastName: "Schopenauher",
    language: "German",
  });

  const newStandardGenre = new Genre({
    uuid: uuid.v4(),
    label: "Philosophy",
  });

  const newBookFromForm = new Book({
    uuid: uuid.v4(),
    title: req.body.title,
    year: req.body.year,
    genre: req.body.genre,
    author: req.body.author,
    synopsis: req.body.synopsis
  });

  await newBookFromForm.save();

  res.redirect('/');
});

router.get("/allbooks", function (req, res, next) {
  Book.find({}).populate('genre').populate('author').populate('review').then((books) => {
    console.log(books);
    res.render("all-books", { books: books });
  });
});

router.get("/starshipsbook", async function (req, res, next) {
  const books = [];
  Book.findOne({ title: "Victories" }).populate('genre').populate('author').then((book) => {
    books.push(book);
    console.log(books);
    res.render("all-books", { books: books });
  });
});
//BOOKS END------------------------------------------------------------------------//

//REVIEW STARTS--------------------------------------------------------------------//
router.get("/newreview", async function (req, res, next) {
  res.render("new-review", { uuid: req.query.uuid });
});

router.post("/newreview", async function (req, res, next) {
  console.log(req.body.uuid);

  let book = await Book.findOne({ uuid: req.body.uuid });

  const newReview = new Review({
    uuid: uuid.v4(),
    description: req.body.review,
    book : book._id
  });

  
  await newReview.save();
  book.review.push(newReview)
  await book.save();

  Book.findOne({ uuid : book.uuid }).populate('genre').populate('author').populate('review').then((book) => {
    console.log(book);
  })
});
//REVIEW END-----------------------------------------------------------------------//

module.exports = router;
