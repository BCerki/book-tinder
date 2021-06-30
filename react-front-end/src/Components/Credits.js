import React from "react";
export default function Credits(props) {
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
          (match page). Avatar images from Wikimedia Commons. A big thank you to
          the instructors and mentors at Lighthouse Labs!
        </div>
      </div>
    </div>
  );
}
