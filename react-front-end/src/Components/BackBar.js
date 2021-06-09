import React, { useContext } from "react";

import { bookStateContext } from "../providers/BookStateProvider";

//import components
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ChatIcon from "@material-ui/icons/Chat";
import Avatar from "@material-ui/icons/AccountBox";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import BlockIcon from "@material-ui/icons/Block";

//Styling
import "../styles/backbar.scss";
import axios from "axios";

export default function BackBar(props) {
  const { currentBook, block } = useContext(bookStateContext);
  console.log("currentBook.image in backbar", currentBook.image);

  return (
    <div className="backBar">
      <Link to="/books">
        <ArrowBackIosIcon />
      </Link>
      <Avatar className="chatAvatar" src={currentBook.image} />
      <div>
        <Link to="/books">
          <BlockIcon
            onClick={() => {
              block(currentBook.id);
            }}
          />
        </Link>
      </div>
    </div>
  );
}
