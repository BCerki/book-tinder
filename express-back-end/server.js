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
  const queryUser = `SELECT users.id, users.name AS username, users.radius_pref, users.pages_max_pref,
  users.pages_min_pref, users.maturity_pref, users.age_max_pref, users.age_min_pref, users.price_max_pref, genres.id AS genres_id, genres.name AS genres_name
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
      userProfileObj.id = resultRows[i].id;
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

//Do we need to send block table data to front-end??
App.get("/api/blocked", (req, res) =>{

});

//New blocked book **WORKING**
//BookID is currently undefined from front-end
//Temporarily hard coded bookId value in axios function to confirm db update is working.
App.post("/api/blocked/:id", (req, res) => {
  console.log(req.params)
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

//New convo in convo table **IN PROGRESS**
App.post("/api/conversations", (req, res) => {
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

//Update user in users table **NEEDS TO BE MODIFIED per new users table format**
//Not receiving correct user obj from front
App.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(req.body);

  const updateUser = `UPDATE users SET name = $1, age = $2, page_count = $3, price = $4,
  max_distance = $5, maturity = $6, genres = $7, WHERE id = $8 `;

  const values = [
    req.body.name,
    req.body.age,
    req.body.page_count,
    req.body.price,
    req.body.max_distance,
    req.body.maturity,
    req.body.genres,
    id,
  ];

  return pool
    .query(updateUser, values)
    .then((result) => {
      console.log(result);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//TESTING UserStateProvider for location change:
// App.put("/api/users/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   console.log("what is this:", req.body);
//   console.log("And this:", req.params);

//   const updateUser = `UPDATE users SET radius_pref =$1 WHERE id = $2 `;

//   const values = [req.body.radius_pref, id];

//   return pool
//     .query(updateUser, values)
//     .then((result) => {
//       console.log(result);
//       return result;
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
