import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
//<div className="isbn">ISBN: {props.isbn}</div>
export default function PostCode(props) {
  console.log("props in postalcode are", props);
  //styling
  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }));
  const classes = useStyles();
  //function
  const isEditing = function() {
    if (props.isEditing === true) {
      return (
        <TextField
          label="Name"
          id="outlined-margin-none"
          defaultValue={props.name}
          className={classes.textField}
          // helperText="Some important text"
          variant="outlined"
        />
      );
    }
    return <div onClick={props.onClick}>{props.name}</div>;
  };

  return (
    <div className={"username"} onBlur={props.onBlur}>
      {isEditing()}
    </div>
  );
}
