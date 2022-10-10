const moment = require("moment");
const ObjectId = require("mongodb").ObjectId;
const time_func = require("../helpers");
const { dbConnection } = require("../config/mongoConnection");
dbConnection();
const movies = require("../config/mongoCollections");
const mongoose = require("mongoose");
const { updateOne } = require("../helpers");

// const movies = mongoose.Schema.ObjectId.get((v) =>
//   v != null ? v.toString() : v
// );

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  if (
    typeof title === "string" &&
    typeof plot === "string" &&
    typeof rating === "string" &&
    typeof studio === "string" &&
    typeof director === "string" &&
    typeof dateReleased === "string" &&
    typeof runtime === "string"
  ) {
    if (
      title &&
      title.trim().length > 0 &&
      plot &&
      plot.trim().length > 0 &&
      rating &&
      rating.trim().length > 0 &&
      director &&
      director.trim().length > 0 &&
      dateReleased &&
      dateReleased.trim().length > 0 &&
      runtime &&
      runtime.trim().length > 0
    ) {
      // console.log((/[a-zA-Z0-9]+$/).test(title))
      // console.log('length',title.length>=2)
      // console.log(
      //   director
      //     .split(" ")
      //     .every(
      //       (item) =>
      //         item.length >= 3 === true &&
      //         /^[A-Z][a-z]+[,.'-]?(?: [A-Z][a-z]+[,.'-]?)*$/.test(item) === true
      //     )
      // );
      if (
        title.length >= 2 &&
        /[a-zA-Z0-9]+$/.test(title) &&
        /^[A-Z][a-z]+[,.'-]?(?: [A-Z][a-z]+[,.'-]?)*$/.test(studio) &&
        studio.length >= 5 &&
        director
          .split(" ")
          .every(
            (item) =>
              item.length >= 3 &&
              /^[A-Z][a-z]+[,.'-]?(?: [A-Z][a-z]+[,.'-]?)*$/.test(item) === true
          )
      ) {
        if (
          rating === "G" ||
          rating === "PG" ||
          rating === "PG-13" ||
          rating === "R" ||
          rating === "NC-17"
        ) {
          if (
            Array.isArray(genres) === true &&
            genres.length >= 1 &&
            genres.every((item) => typeof item === "string" && item.length >= 5)
          ) {
            if (
              genres.every(
                (item) =>
                  /^[A-Za-z]+[,.'-]?(?: [A-Z][a-z]+[,.'-]?)*$/.test(item) ===
                  true
              )
            ) {
              if (
                Array.isArray(castMembers) === true &&
                castMembers.length >= 1 &&
                castMembers.every(
                  (item) =>
                    typeof item === "string" &&
                    /^[A-Za-z]+[,.'-]?(?: [A-Z][a-z]+[,.'-]?)*$/.test(item) ===
                      true
                )
              ) {
                if (
                  castMembers.every((item) => {
                    const name = item.split(" ");
                    const [first, last] = name;
                    return first.length >= 3 && last.length >= 3;
                  })
                ) {
                  // date released
                  const [month, day, year] = dateReleased.split("/");
                  const dateReleasedCom = new Date(
                    +year,
                    +month - 1,
                    +day
                  ).getFullYear();

                  //comparison hard coded
                  const [months, days, years] = "01/01/1900".split("/");
                  const check = new Date(
                    +years,
                    +months - 1,
                    +days
                  ).getFullYear();
                  console.log(dateReleasedCom, check);
                  // console.log(dateR.getFullYear())
                  // const check = new Date(01/01/1900).getFullYear()-25
                  // console.log(moment(01 / 01 / 1900));
                  console.log(
                    moment(dateReleased, "MM/DD/YYYY", true).isValid()
                  );
                  if (
                    moment(dateReleased, "MM/DD/YYYY", true).isValid() &&
                    dateReleasedCom > check &&
                    dateReleasedCom < new Date().getFullYear() + 2
                  ) {
                    const mytime = time_func(runtime);
                    console.log("mytime variable", mytime);
                    if (mytime) {
                      console.log("working inside");
                      const movie = await movies({
                        title: title,
                        plot: plot,
                        genres: genres,
                        rating: rating,
                        studio: studio,
                        director: director,
                        castMembers: castMembers,
                        dateReleased: dateReleased,
                        runtime: mytime,
                      });
                      console.log(movie);

                      // movie._id= movie._id.valueOf()
                      movie.save();
                    }
                  }
                }
              } else {
                throw "cast members contains numbers";
              }
            }
          } else {
            throw "array not contains atleast one of type string";
          }
        } else {
          throw "NOT Valid ratings";
        }
      }
    } else {
      throw "All fields needs to have valid values";
    }
  } else {
    throw "All fields type must be string";
  }
};

//   const allMovies = await movies;
//   const res = await allMovies.find({ _id: { $type: "objectId" } });
//   console.log(res)
//   res.forEach( async (x)  => {
//   var oldId = await x._id;
//   x._id = await ''+x._id   // convert field to string
//   await allMovies.deleteMany({ _id: oldId });
//   await allMovies.insertMany(x)

// });

/* createMovie(
  "Faisal",
  "Hackers",
  ["drama", "fantasy", "sssss"],
  "PG-13",
  "United Artists",
  "Iain Softley",
  ["Johnny Miller", "Angelina Jolie"],
  "02/27/2022",
  "1h 60min"
); */

const getAllMovies = async () => {
  const allMovies = await movies;
  if (allMovies.length > 0) {
    const res = await allMovies.find();
    console.log(res);
  } else {
    return [];
  }
  /* const mov = res.map((obj) => (obj._id = obj._id.valueOf()));
  // console.log(mov);
  console.log(res); */
};
// getAllMovies();
const getMovieById = async (id) => {
  if (!id) {
    throw "Id is not provide";
    return;
  }
  if (typeof id !== "string" || id.trim().length === 0) {
    throw "id is not string or id is emty";
    return;
  }
  if (mongoose.Types.ObjectId.isValid(id) !== true) {
    throw "id not valid";
    return;
  }
  try {
    const data = await movies;
    const response = await data.find({ _id: id });
    if (response.length > 0) {
      console.log(response[0]);
    } else {
      throw "provided id is not in database";
    }
  } catch (err) {
    console.log(err);
  }
};
//getMovieById("6341a7696949f2185a0953c6");
const removeMovie = async (id) => {
  if (!id) {
    throw "Id is not provide";
    return;
  }
  if (typeof id !== "string" || id.trim().length === 0) {
    throw "id is not string or id is emty";
    return;
  }
  if (mongoose.Types.ObjectId.isValid(id) !== true) {
    throw "id not valid";
    return;
  }
  try {
    const data = await movies;
    const tes = await data.find({ _id: id });
    if (tes.length > 0) {
      const movie_name = tes[0].title;
      const response = await data.deleteMany({ _id: id });
      console.log(`${movie_name} movie has been successfully deleted`);
    } else {
      throw "id is not in te database";
    }
  } catch (err) {
    console.log(err);
  }
};

//removeMovie("6341a94f8bc009c23855a6b2");
const renameMovie = async (id, newName) => {
  if (!id) {
    throw "Id is not provide";
    return;
  }
  if (typeof id !== "string" || id.trim().length === 0) {
    throw "id is not string or id is emty";
    return;
  }
  if (mongoose.Types.ObjectId.isValid(id) !== true) {
    throw "id not valid";
    return;
  }
  if (!newName) {
    throw "newName is not provide";
    return;
  }
  if (typeof newName !== "string" || newName.trim().length === 0) {
    throw "newName is not string or newName is emty";
    return;
  }
  if (newName.length < 2 && /[a-zA-Z0-9]+$/.test(newName)) {
    throw "name is not in valid format";
    return;
  }

  try {
    const data = await movies;
    const tes = await data.find({ _id: id });
    if (tes.length > 0) {
      const res = await movies.updateOne(
        { _id: id },
        {
          $set: {
            title: newName, // titile is field name ypu can add any field
          },
        }
      );
      const tes2 = await data.find({ _id: id });
      console.log(tes2[0]);
    } else {
      throw "id is not in the database";
    }
  } catch (err) {
    console.log(err);
  }
};
//renameMovie("6341a96130a14ba865b8c2c8", "hassan");

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  renameMovie,
};
