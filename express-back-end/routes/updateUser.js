// const { Pool } = require("pg");

// const updateUser = function() {
//   const queryUser = `UPDATE users SET .....`;

//   return pool
//   .query(queryUser)
//   .then((result) => {
//     console.log("results:", result)
//     return result;
//   })
//   .catch((err) => {
//     console.log("error:", err)
//   });
// };

//Do we want to only update changed values (and is the whole users obj being sent from front end on any change)?
`UPDATE users SET name = $2, radius_pref = $3, pages_max_pref = $4, etc.
WHERE users.id = $1
AND EXISTS (
  SELECT * EXCEPT SELECT
  name = $2, 
  radius_pref = $3,
  pages_max_pref = $4,
  etc.
)`

//OR, are we getting each piece of row data separately (only name is sent on update)?
`UPDATE users SET name = $2 WHERE id = $1 AND name <> $2`

//OR, is the whole user obj coming from front-end and we just update the entire record?
`UPDATE users SET name =$2, radius_pref = $3, pages_max_pref =$4,e etc. WHERE id = $1`