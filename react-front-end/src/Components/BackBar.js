import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ChatIcon from "@material-ui/icons/Chat";
import Avatar from "@material-ui/icons/AccountBox";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

//Styling
import "../styles/backbar.scss";

export default function BackBar(props) {
  return (
    <div className="backBar">
      <Link to="/middle">
        <ArrowBackIosIcon />
      </Link>
      <Avatar className="chatAvatar" />
      <div>
        <ArrowBackIosIcon className="hidden" />
      </div>
    </div>
  );
}
