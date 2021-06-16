import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default function Credits(props) {
  // console.log("props in info", props);
  return (
    <div className={"page"}>
      <div className={"tagline"}>
        <div className={"credits"}>
          Data provided by{" "}
          <a
            className={"creditsLink"}
            href="https://www.booknetcanada.ca/biblioshare"
          >
            BNC BiblioShare
          </a>
          , BookManager, and Google Books. Photos by{" "}
          <a
            className={"creditsLink"}
            href="https://unsplash.com/@dollargill?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Dollar Gill
          </a>{" "}
          (this page) and{" "}
          <a
            className={"creditsLink"}
            href="https://unsplash.com/@laurachouette?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Laura Chouette
          </a>{" "}
          (match page). A big thank you to the instructors and mentors at
          Lighthouse Labs!
        </div>
      </div>
    </div>
  );
}
