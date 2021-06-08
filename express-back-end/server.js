require("dotenv").config();

const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const books = require("./routes/books");
const PORT = 8080;
const { Pool } = require("pg");
require("dotenv").config();
// const getUserData = require("./routes/user");

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static("public"));

// DB Configuration
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
});
console.log("process.env.DB_USER", process.env.DB_USER);
// Sample GET route
// App.get("/api/data", (req, res) =>
//   res.json({
//     message: "Seems to work!",
//   })
// );

// BookTinder GET route
App.get("/api/test", (req, res) => {
  return pool.query(`SELECT * FROM books`).then(function (result) {
    console.log("LOG: server: query books: result:", result);
    res.send(result.rows);
  });
});

// Users GET route
// App.get("/api/users", (req, res) => {
//   getUserData().then(function (result) {
//     console.log("LOG: server: getUserData: result:", result);
//     res.send(result);
//   });
// });

// Users GET route 2
App.get("/api/users", (req, res) => {
  const queryUser = `SELECT users.id, users.name AS username, users.radius_pref, users.pages_max_pref, users.pages_min_pref, users.maturity_pref, users.age_max_pref, users.age_min_pref, users.price_max_pref, genres.id AS genres_id, genres.name AS genres_name
  FROM users
  JOIN genre_user ON genre_user.users_id = users.id
  JOIN genres ON genres.id = genre_user.genres_id`;

  return pool.query(queryUser).then((result) => {
    let resultRows = result.rows;
    let userProfileArr = [];
    let genreArr = [];
    for (let i = 0; i < resultRows.length; i++) {
      let userProfileObj = {};
      let genreObj = {};
      userProfileObj.name = resultRows[i].username;
      userProfileObj.radius_pref = resultRows[i].radius_pref;
      userProfileObj.pages_max_pref = resultRows[i].pages_max_pref;
      userProfileObj.pages_min_pref = resultRows[i].pages_min_pref;
      userProfileObj.maturity_pref = resultRows[i].maturity_pref;
      userProfileObj.age_min_pref = resultRows[i].age_min_pref;
      userProfileObj.price_max_pref = resultRows[i].price_max_pref;
      genreObj.id = resultRows[i].genres_id;
      genreObj.name = resultRows[i].genres_name;
      userProfileArr.push(userProfileObj);
      genreArr.push(genreObj);
    }
    userProfileArr[0].genres = genreArr;
    console.log([userProfileArr[0]]);
    res.send([userProfileArr[0]]);
  });
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
