const mov = require('./data/movies')

//1. Create a Movie of your choice.
//2. Log the newly created Movie. (Just that movie, not all movies)

async function main(){
    try{
       await mov.createMovie(
            "Hackers",
            "Hackers are blame for making a virus that will capsize five oil space tnakers",
            ["drama", "crime", "romance"],
            "PG-13",
            "United Artists",
            "Iain Softley",
            ["Johnny Miller", "Angelina Jolie", "Mattxew Lillard" , "Fisher Stephen"],
            "09/15/1995",
            "1h 45min"
          );

    }catch(e){
        console.log(e)
    }
}

//main()




//3. Create another movie of your choice.

/* mov.createMovie(
    "Snowden",
    "Hackers are blame for making a virus that will capsize five oil space tnakers",
    ["drama", "crime", "romance"],
    "PG-13",
    "United Artists",
    "Iain Softley",
    ["Johnny Miller", "Angelina Jolie", "Mattxew Lillard" , "Fisher Stephen"],
    "09/15/1995",
    "1h 45min"
  ); */

//4. Query all movies, and log them all

/* console.log(mov.getAllMovies()); */

//5. Create the 3rd movie of your choice.
//6. Log the newly created 3rd movie. (Just that movie, not all movies)

async function main2(){
    try{
       await mov.createMovie(
            "Alive",
            "Hackers are blame for making a virus that will capsize five oil space tnakers",
            ["drama", "crime", "romance"],
            "PG-13",
            "United Artists",
            "Iain Softley",
            ["Johnny Miller", "Angelina Jolie", "Mattxew Lillard" , "Fisher Stephen"],
            "09/15/1995",
            "1h 45min"
          );

    }catch(e){
        console.log(e)
    }
}

//main2()




//7. Rename the first movie
//8. Log the first movie with the updated name. 

/* console.log(mov.renameMovie("6341b5505d7bd1874680836c", "Hackers2")); */


//9. Remove the second movie you created.

async function main3(){
    try{
       await console.log(mov.removeMovie("6341b5505d7bd1874680836c"));

    }catch(e){
        console.log(e)
    }
}

//main3()
//10. Query all movies, and log them all

/* console.log(mov.getAllMovies()); */


//11. Try to create a movie with bad input parameters to make sure it throws errors.
/* mov.createMovie(
    456,
    "Hackers are blame for making a virus that will capsize five oil space tnakers",
    ["drama", "crime", "romance"],
    "PG-13",
    "United Artists",
    "Iain Softley",
    ["Johnny Miller", "Angelina Jolie", "Mattxew Lillard" , "Fisher Stephen"],
    "09/15/1995",
    "1h 45min"
  ); */

//12. Try to remove a movie that does not exist to make sure it throws errors.

async function main4(){
    try{
       await mov.removeMovie("6341b98721728fef7f838bdd");

    }catch(e){
        console.log(e)
    }
}

//main4()

//13. Try to rename a movie that does not exist to make sure it throws errors.

/* console.log(mov.renameMovie("6341b98721728fef7f838bdd", "spider man"));
 */

//14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.

/* console.log(mov.renameMovie("6341b98721728fef7f838bdd", "A")); */


//15. Try getting a movie by ID that does not exist to make sure it throws errors.

mov.getMovieById("6341b98721728fef7f838bcc")
