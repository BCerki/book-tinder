import Avatar from "@material-ui/core/Avatar";
//import components
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import BlockIcon from "@material-ui/icons/Block";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
//Styling
import "../styles/backbar.scss";

export default function BackBar(props) {
  // const { currentBook, block } = useContext(bookStateContext);
  // console.log("back bar props are", props);
  const block = function(bookId) {
    axios
      //MICHELLE this should add the book to the blocked table
      .post(`/api/users/1/blocked/${bookId}`, bookId)
      .then((result) => {
        console.log("successfully sent post to db, bookid is,", bookId);
      })
      .catch((err) => console.log("Error message:", err.message));

    axios
      //MICHELLE this should delete the book from the conversations table
      .delete(`/api/users/1/conversations/${bookId}`, bookId)
      .then((result) => {
        console.log("successfully sent delete to db, bookid is,", bookId);
      })
      .catch((err) => console.log("Error message:", err.message));
  };

  //Material UI styling
  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }));
  const classes = useStyles();

  // console.log("in the back bar, currentBook.image is", currentBook.image);
  // console.log("in the back bar, currentBook.image is", currentBook.id);

  return (
    <div className="backBar">
      <Link to="/matches" className={"backBarIcon"}>
        <div>
          <ArrowBackIosIcon />
        </div>
      </Link>
      <Avatar src={props.image} alt={props.title} className={classes.large} />
      <Link to="/matches" className={"backBarIcon"}>
        {/* <a href="/matches" className={"backBarIcon"}> */}
        <div>
          <BlockIcon
            onClick={() => {
              block(props.bookId);
            }}
          />
        </div>
        {/* </a> */}
      </Link>
    </div>
  );
}
