const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: 123,
  host: "localhost",
  database: "booktinder",
});

const getUserData = function () {
  const queryUser = `SELECT users.id, users.name AS username, users.radius_pref, users.pages_max_pref, users.pages_min_pref, users.maturity_pref, users.age_max_pref, users.age_min_pref, users.price_max_pref, genres.id AS genres_id, genres.name AS genres_name
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
    return [userProfileArr[0]];
  });
};

console.log(getUserData());

module.exports = getUserData;
