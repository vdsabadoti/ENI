const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CREATE AN OBJECT OF TYPE SCHEMA.
//THE OBJECT IS A COLLECTION FOR MONGODB.
//COLLECTION = TABLE (IN TERSM OF A SQL DB).
//THANKS TO MONGOOSE => MODEL DESIGN FOR A DB WHO HAS NO RULES.

const AuthorSchema = new Schema({
    uuid : {type : String, required : true},
    firstName : {type: String, required : true},
    lastName : {type : String, required : true},
    language : {type: String, required : true}
});

const GenreSchema = new Schema({
    uuid : {type : String, required : true},
    label : {type : String, required : true}
});

const ReviewSchema = new Schema({
  uuid: { type: String, required: true },
  description: { type: String, required: true },
  book: { type: Schema.Types.ObjectId, ref: "Book", required: false },
});

const Genre = mongoose.model("Genre", GenreSchema);
const Review = mongoose.model("Review", ReviewSchema);

module.exports = { AuthorSchema, Genre, Review };

