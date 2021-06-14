import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default function Tagline(props) {
  // console.log("props in info", props);
  return (
    <Link to="/books">
      <div className={"tagline"}>
        <div className={"credits"}>
          Data provided by{" "}
          <a href="https://www.booknetcanada.ca/biblioshare">BNC BiblioShare</a>
        </div>
      </div>
    </Link>
  );
}
