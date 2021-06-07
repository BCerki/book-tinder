const { Pool } = require('pg');


const pool = new Pool({
  user: 'vagrant',
  host: 'localhost',
  password: '1234',
  database: 'vagrant' 
});


const getBooks = function() {
  const queryBooks = `SELECT * FROM books`;

  return pool
  .query(queryBooks)
  .then((result) => {
    console.log("results", result)
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message)
  });
};

exports.getBooks = getBooks;