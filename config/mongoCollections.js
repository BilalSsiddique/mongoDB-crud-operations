/* const dbConnection = require("./mongoConnection"); */

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
/* const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
}; */

/* Now, you can list your collections here: 
NOTE: YOU WILL NEED TO CHANGE THE CODE BELOW TO HAVE THE COLLECTION(S) REQUIRED BY THE ASSIGNMENT */
/* module.exports = {
  posts: getCollectionFn("posts"),
  dogs: getCollectionFn("dogs"),
};
 */

//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

var ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");

var movieSchema = mongoose.Schema({
  title: String,
  plot: String,
  genres: [String],
  rating: String,
  studio: String,
  director: String,
  castMembers: [String],
  dateReleased: Date,
  runtime: String,
});

module.exports = mongoose.model("movies", movieSchema);


