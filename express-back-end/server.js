require("dotenv").config();

const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const books = require("./routes/books");
const PORT = 8080;
const { Pool } = require("pg");
// const getUserData = require("./routes/user");
const { response } = require("express");

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
  return pool
    .query(`SELECT * FROM books`)
    .then(function (result) {
      console.log("LOG: server: query books: result:", result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// Users GET route
App.get("/api/users", (req, res) => {
  return pool
    .query(`SELECT * FROM users`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//New blocked book **IN PROGRESS**
App.post("api/block", (req, res) => {
  const block = `INSERT INTO block_user VALUES ($1, $2)`;
});

//New convo in convo table **IN PROGRESS**
App.post("api/conversations", (req, res) => {
  const newMatch = `INSERT INTO conversations VALUES ($1, $2)`;

  const values = [req.body.user_id, req.body.book_id];

  return pool
    .query(newMatch, values)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//Update user's genre prefs
// App.put("api/genres/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const genreId = 0;

//   for (let obj of req.body.genres) {
//     genreId = obj.id;
//   };

//   const updateUserGenres = `UPDATE genre_user SET genres_id = $1 WHERE users_id = $2`;

//   const values = [
//     genreId,
//     id
//   ];

//   return pool.query(updateUserGenres, values)
//   .then((result) => {
//     console.log(result);
//     return result;
//   })
//   .catch((err) =>{
//     console.log(err.message)
//   });
// });

//Update user in users table **NEEDS TO BE MODIFIED per new users table format**
App.put("/api/user/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const updateUser = `UPDATE users SET name = $1, radius_pref =$2, pages_max_pref = $3, pages_min_pref = $4,
  maturity_pref = $5, age_max_pref = $6, age_min_pref = $7, price_max_pref = $8 WHERE id = $9 `;

  const values = [
    req.body.name,
    req.body.radius_pref,
    req.body.pages_max_pref,
    req.body.pages_min_pref,
    req.body.maturity_pref,
    req.body.age_max_pref,
    req.body.age_min_pref,
    req.body.price_max_pref,
    id,
  ];

  return pool
    .query(updateUser, values)
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//TESTING UserStateProvider for location change:
App.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("what is this:", req.body);
  console.log("And this:", req.params);

  const updateUser = `UPDATE users SET radius_pref =$1 WHERE id = $2 `;

  const values = [req.body.radius_pref, id];

  return pool
    .query(updateUser, values)
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(err.message);
    });
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
