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
// console.log("process.env.DB_USER", process.env.DB_USER);
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
      // console.log("LOG: server: query books: result:", result);
      console.log("test", result.rows);
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

//Do we need to send block table data to front-end??
App.get("/api/blocked", (req, res) =>{

});

//New blocked book **WORKING**
App.post("/api/blocked/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const userId = 1;

  const blocked = `INSERT INTO block_user (users_id, books_id) VALUES ($1, $2)`;

  const values = [userId, bookId];

  return pool
    .query(blocked, values)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    }); 
});

//New match/convo in convo table **WORKING**
App.post("/api/conversations/:id", (req, res) => {
  const userId = 1;

  const newMatch = `INSERT INTO conversations (user_id, book_id) VALUES ($1, $2)`;

  const values = [userId, req.params.id];

  return pool
    .query(newMatch, values)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//Delete book from convo table on block **WORKING**
App.delete("/api/conversations/:id", (req, res) => {
  const blockedConvo = `DELETE FROM conversations WHERE user_id = 1 AND book_id = $1`;
  
  const values = [req.params.id];

  return pool.query(blockedConvo, values)
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log(err.message);
  })
})

//Update user data in users table
//Slow but **WORKING**.
App.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("body:", req.body);

  const updateUser = `UPDATE users SET name = $1, age = $2, page_count = $3, price = $4,
  max_distance = $5, maturity = $6, genres = $7 WHERE id = $8 `;

  const values = [
    req.body.name,
    req.body.age,
    req.body.pageCount,
    req.body.price,
    req.body.maxDistance,
    req.body.maturity,
    req.body.genres,
    id,
  ];

  return pool
    .query(updateUser, values)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("error:", err.message);
    });
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
