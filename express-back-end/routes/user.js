const { Pool } = require("pg");
const {
  db_user,
  db_password,
  db_host,
  db_database,
} = require("/vagrant/book-tinder/express-back-end/.secrets.js");

/* Desired Object Shape
[
  {id:
  name:
  radius_pref:
  pages_max_pref:
  pages_min_pref:
  maturity_pref:
  age_max_pref:
  age_min_pref:
  price_max_pref:
  genres: [
     {id:
     name:},
     {id:
     name:}
   ]
  }
]
*/

const pool = new Pool({
  user: "vagrant",
  password: 123,
  host: "localhost",
  database: "booktinder",
});

const getUser = function () {
  const queryUser = `SELECT users.name AS username, users.radius_pref, users.pages_max_pref, users.pages_min_pref, users.maturity_pref, users.age_max_pref, users.age_min_pref, users.price_max_pref, genres.id, genres.name AS genre_name
  FROM users
  JOIN genre_user ON genre_user.users_id = users.id
  JOIN genres ON genres.id = genre_user.genres_id`;

  return pool.query(queryUser).then((result) => {
    console.log(result.rows);
  });
};

console.log(getUser());
