import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ChatIcon from "@material-ui/icons/Chat";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Styling
import "../styles/footer.scss";

export default function Footer(props) {
  return (
    <div className="footer">
      <div>
        <Link to="/">
          <MenuBookIcon />
        </Link>
      </div>
      <div>
        <Link to="/middle">
          <ChatIcon />
        </Link>
      </div>
      <div>
        <Link to="/profile">
          <AccountBoxIcon />
        </Link>
      </div>
    </div>
  );
}
