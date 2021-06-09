// Currently unused file. Don't use, except to eventually export functionality currently in server.js

/*
const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: 123,
  host: "localhost",
  database: "booktinder",
});

const getUserData = function () {
  const queryUser = `SELECT * FROM users`;
  return pool.query(queryUser).then((result) => {
    console.log(result.rows);
  });
};

console.log(getUserData());

module.exports = getUserData;
*/
