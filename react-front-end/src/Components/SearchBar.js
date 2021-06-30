/* eslint-disable no-use-before-define */
import React from "react";
// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import bookData from "../dummyData/dummyBookData";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

// export default function SearchBar() {

//   return (
//     <div style={{ width: 300 }}>
//       <Autocomplete
//         id="free-solo-demo"
//         freeSolo
//         options={bookData.map((option) => option.title)}
//         getOptionSelected={(option, value) => option.name === value.name}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="Search"
//             margin="normal"
//             variant="outlined"
//           />
//         )}
//       />
//     </div>
//   );
// }

export default function SearchBar({
  setSearchTitle,
  searchTitle,
  filterMatches,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTitle(searchTitle);
    filterMatches();
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-uncontrolled"
          label="Search"
          type="search"
          id="search-box"
          variant="outlined"
          placeholder="search book titles"
          value={searchTitle}
          onChange={(event) => setSearchTitle(event.target.value)}
        />
        {/* <button type="submit">Search</button>
        <button className="clear-search" onClick={() => {setSearchTitle('')}}>Return</button> */}
      </form>
    </div>
  );
}
