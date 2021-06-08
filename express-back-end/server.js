require("dotenv").config();

const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const books = require("./routes/books");
const PORT = 8080;
const { Pool } = require("pg");
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
  return pool.query(`SELECT * FROM books`).then(function (result) {
    console.log("LOG: server: query books: result:", result);
    res.send(result.rows);
  });
});

//New convo in convo table
App.post("api/conversations", (req, res) => {});

//New message in messages table
App.post("api/messages", (req, res) => {});

//Update user's genre prefs
App.put("api/genres/:id", (req, res) => {
  const id = pareInt(req.params.id);

  const updateUserGenres = `UPDATE genre_user SET users_id = $1, genres_id = $2 WHERE id = $3`

  
});

//Update user in users table
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

  return pool.query(updateUser, values)
  .then((result) => {
    console.log(result);
    return result;
  })
  .catch((err) => {
    console.log(err.message)
  });
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
