/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import bookData from "../dummyData/dummyGenreData";

export default function SearchBar(props) {
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={bookData.map((book) => book.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            margin="normal"
            variant="outlined"
          />
        )}
      />
    </div>
  );
}
