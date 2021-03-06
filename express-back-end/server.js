require("dotenv").config();

const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const books = require("./routes/books");
const PORT = 8080;
const { Pool } = require("pg");
// const getUserData = require("./routes/user");
const { response } = require("express");
const { result } = require("lodash");
// const {cloudinary} = require('./cloudinary');

// Stuff for PDF conversion
const fs = require("fs");
const download = require("download");
const path = require("path");
const pdf2img = require("pdf2img");

// Helpers
const getSample = require("./helpers/getSample");
const getLocation = require("./helpers/getLocation");

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

// convertPdfToPic helper

App.get("/api/convertPdfToPic", (req, res) => {
  // res.send("Hi from convertPdfToPic");

  // const file =
  //   "https://www.biblioshare.ca/BNCServices/BNCServices.asmx/Samples?token=3e58phfbom2hx2z7&ean=9781459735699&san=&perspective=Sample&filenumber=";
  // // Path at which image will get downloaded
  // const filePath = `${__dirname}/downloads`;

  // download(file, filePath).then(() => {
  //   console.log("Download Completed");
  // });

  const input = __dirname + "/downloads/9781459735699_Sample.pdf";
  // const input = "/downloads/9781459735699_Sample.pdf";
  pdf2img.setOptions({
    type: "png", // png or jpg, default jpg
    size: 1024, // default 1024
    density: 600, // default 600
    // outputdir: __dirname + path.sep + "output", // output folder, default null (if null given, then it will create folder name same as file name)
    outputdir: __dirname + "/downloads/images", // output folder, default null (if null given, then it will create folder name same as file name)
    outputname: "covertPDF-01", // output file name, dafault null (if null given, then it will create image name same as input name)
    page: null, // convert selected page, default null (if null given, then it will convert all pages)
  });

  pdf2img.convert(input, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  // .catch((err) => {
  //   console.error(err);
  //   res.status(500).send(err.message);
  // });

  // const filePath =
  //   "https://www.biblioshare.ca/BNCServices/BNCServices.asmx/Samples?token=3e58phfbom2hx2z7&ean=9781459735699&san=&perspective=Sample&filenumber="; // Or format the path using the `id` rest param
  // var fileName = "./images/test.pdf"; // file name
  // res.download(filePath, fileName);
  // .download(
  //   "https://www.biblioshare.ca/BNCServices/BNCServices.asmx/Samples?token=3e58phfbom2hx2z7&ean=9781459735699&san=&perspective=Sample&filenumber="
  // )
  // .then((response) => {
  //   // console.log("LOG: server.js: /api/getLocation: response:", response);
  //   res.status(200);
  // })
  // .catch((err) => {
  //   console.error(err);
  //   res.status(500).send(err.message);
  // });
});

// getLocation helper
App.get("/api/getlocation", (req, res) => {
  console.log("LOG: server.js: /api/getLocation: At this route!");
  const isbn = req.query.isbn;
  const postal = req.query.postal;
  const max_distance = req.query.max_distance;
  getLocation(isbn, postal, max_distance)
    .then((response) => {
      console.log("LOG: server.js: /api/getLocation: response:", response);
      res.status(200).send(response);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

// getSample helper
App.get("/api/sample", (req, res) => {
  console.log("LOG: server.js: /api/sample At this route!");
  const isbn = req.query.isbn;
  const randomNum = req.query.randomNum;
  getSample(isbn, randomNum)
    .then((response) => {
      console.log("LOG: server.js: /api/sample: response:", response);
      res.json(response);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

// BookTinder GET route **WORKING**
App.get("/api/users/:id/books", (req, res) => {
  return pool
    .query(
      `SELECT * FROM books WHERE NOT EXISTS
    (SELECT * FROM conversations WHERE books.id = conversations.book_id)
    AND NOT EXISTS (SELECT * FROM block_user WHERE books.id = block_user.books_id)
    AND NOT EXISTS (SELECT * FROM rejected WHERE books.id = rejected.book_id)`
    )
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

//Block book **WORKING**
App.post("/api/users/:id/blocked/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const userId = 1;

  console.log("I am hitting");

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

//Rejected Book (swipe left) **WORKING**
App.post("/api/users/:id/rejected/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const userId = 1;

  const rejected = `INSERT INTO rejected (user_id, book_id) VALUES ($1, $2)`;

  const values = [userId, bookId];

  return pool
    .query(rejected, values)
    .then((result) => {
      console.log("what is this:", result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

//Match/Convo GET route **WORKING**
App.get("/api/users/:id/conversations", (req, res) => {
  const bookQuery = `SELECT * FROM books, conversations WHERE books.id = conversations.book_id AND conversations.user_id = 1`;

  return pool
    .query(bookQuery)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

//New match/convo **WORKING**
App.post("/api/users/:id/conversations/:id", (req, res) => {
  const userId = 1;

  const newMatch = `INSERT INTO conversations (user_id, book_id) VALUES ($1, $2)`;

  const values = [userId, req.params.id];

  return pool
    .query(newMatch, values)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

//Add message string to convo table **IN PROGRESS**
App.put("/api/users/:id/conversations/:id", (req, res) => {
  convoId = parseInt(req.params.id);
  console.log("params are:", req.params);
  console.log("body is:", req.body);

  const newMessage = `UPDATE conversations SET message = $1 WHERE id = $2`;

  const values = [JSON.stringify(req.body), convoId];

  return pool
    .query(newMessage, values)
    .then((result) => {
      console.log(result);
      res.json(result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

//Delete book from convo table on block **WORKING**
App.delete("/api/users/:id/conversations/:id", (req, res) => {
  const blockedConvo = `DELETE FROM conversations WHERE user_id = 1 AND book_id = $1`;

  const values = [req.params.id];

  console.log("blockedConvo", blockedConvo, "values:", values);

  return pool
    .query(blockedConvo, values)
    .then((result) => {
      res.send(result.rows);
      console.log("result.rows", result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

// Users GET route **WORKING**
App.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const queryUser = `SELECT * FROM users WHERE id = $1`;

  const values = [userId];

  return pool
    .query(queryUser, values)
    .then((result) => {
      console.log("GET ROUTE:", result.rows);
      const transformed = [];
      for (const val of result.rows) {
        const user = {
          id: val.id,
          name: val.name,
          age: val.age,
          pageCount: val.page_count,
          price: val.price,
          maxDistance: val.max_distance,
          maturity: val.maturity,
          genres: val.genres,
          postalCode: val.postal_code,
          avatar: val.avatar,
        };
        transformed.push(user);
      }
      console.log("Transformed", transformed);
      res.send(transformed);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

//New user **WORKING**
App.post("/api/users/:id", (req, res) => {
  // const id = parseInt(req.params.id);

  const newUser = `INSERT INTO users (name, age, page_count, price, max_distance, maturity, genres, postal_code)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

  const values = [
    req.body.name,
    req.body.age,
    req.body.pageCount,
    req.body.price,
    req.body.maxDistance,
    req.body.maturity,
    req.body.genres,
    req.body.postalCode,
    req.body.avatar,
  ];

  return pool
    .query(newUser, values)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

//Update user data in users table **WORKING**
App.put("/api/users/:id", (req, res) => {
  // console.log("POST BODY:", req.body);

  const id = parseInt(req.params.id);

  const updateUser = `UPDATE users SET name = $1, age = $2, page_count = $3, price = $4,
  max_distance = $5, maturity = $6, genres = $7, postal_code = $8, avatar = $9 WHERE id = $10 `;

  const values = [
    req.body.name,
    req.body.age,
    req.body.pageCount,
    req.body.price,
    req.body.maxDistance,
    req.body.maturity,
    req.body.genres,
    req.body.postalCode,
    req.body.avatar,
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

//AVATAR UPLOAD TO CLOUD STORAGE (Cloudinary):
// App.post("/api/upload", (req, res) => {
//   console.log("POST BODY:", req.body);
//   const fileString = req.body;
//   return cloudinary.uploader.upload(fileString)
//   .then((result) => {
//     res.send(result);
//   })
//   .catch((err) => {
//     res.status(500).send(err.message);
//   });
// });

// try {
//   const fileString = JSON.parse(JSON.stringify(req.body));
//   const uploadedResponse = await cloudinary.uploader.upload(fileString, {
//     upload_preset: "book-tinder",
//   });
//   console.log(uploadedResponse);
//   res.json("Upload Successful!");
// } catch (error) {
//   console.error(error);
//   res.status(500).json({ err: "upload unsuccessful" });
// }

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good ????`
  );
});
