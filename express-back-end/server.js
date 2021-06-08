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
App.post("api/conversations", (req, res) => {

});

//New message in messages table
App.post("api/messages", (req, res) => {

});

//New user's genre prefs
App.post("api/genres/:id", (req, res) => {

});

//Update user's genre prefs
App.put("api/genres/:id", (req, res) => {

});

//Update user in users table
App.put("/api/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { values } = req.body;

  pool.query(`UPDATE users SET `, (error, result) => {
    console.log(error, result);
  })
});
//EXAMPLE PUT FOR REFERENCE:
// const updateUser = (request, response) => {
//   const id = parseInt(request.params.id)
//   const { name, email } = request.body

//   pool.query(
//     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`User modified with ID: ${id}`)
//     }
//   )
// }



App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
