import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ForumIcon from "@material-ui/icons/Forum";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import React from "react";
import { Link } from "react-router-dom";
//Styling
import "../styles/footer.scss";

export default function Footer(props) {
  return (
    <div className={"footer"}>
      <div className={"footerIcon"}>
        <Link to="/books" className={"footerIcon"}>
          <MenuBookIcon />
        </Link>
      </div>
      <div>
        <Link to="/matches" className={"footerIcon"}>
          <ForumIcon />
        </Link>
      </div>
      <div>
        <Link to="/profile" className={"footerIcon"}>
          <AccountBoxIcon />
        </Link>
      </div>
    </div>
  );
}
