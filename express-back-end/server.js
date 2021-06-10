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

// BookTinder GET route /api/users/1/books/:id
App.get("/api/books", (req, res) => {
  return pool
    .query(`SELECT * FROM books WHERE NOT EXISTS 
    (SELECT * FROM conversations WHERE books.id = conversations.book_id) 
    AND NOT EXISTS (SELECT * FROM block_user WHERE books.id = block_user.books_id)
    AND NOT EXISTS (SELECT * FROM rejected WHERE books.id = rejected.book_id)`)
    .then(function (result) {
      // console.log("LOG: server: query books: result:", result);
      console.log("test", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send(err.message);
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
      console.error(err);
      res.status(500).send(err.message);
    });
});

//Block book **WORKING**
App.post("/api/blocked/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const userId = 1;

  const blocked = `INSERT INTO block_user (users_id, books_id) VALUES ($1, $2)`;

  const values = [userId, bookId];

  return pool
    .query(blocked, values)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    }); 
});

//Match/Convo GET route "/api/users/1/conversations/:id"
App.get("/api/conversations", (req, res) => {
  return pool
    .query(`SELECT * FROM conversations WHERE user_id = 1`)
    .then((result) => {
      console.log("result:", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    })
});

//New match/convo **WORKING**
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
      console.error(err);
      res.status(500).send(err.message);
    });
});

//Delete book from convo table on block **WORKING**
App.delete("/api/conversations/:id", (req, res) => {
  const blockedConvo = `DELETE FROM conversations WHERE user_id = 1 AND book_id = $1`;
  
  const values = [req.params.id];

  return pool.query(blockedConvo, values)
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(err.message);
  });
});

//Update user data in users table **WORKING**
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
      res.send(result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
