# BookUp: Judging a Book by its Cover

A Tinder-like dating app to help readers fall in love with local books based on their reading preferences. You can set up a profile with preferences for the books you want to “date” (preferred age range, commitment level, date cost, maximum distance, maturity, and genres). The app will present you with cover images and you can swipe to the right/left for like/nope. If the book swipes right on you too (all do), you get to message each other—the book will send you interior photos, quotes from itself (from Google Books and Booknet Canada APIs), predetermined book flirts, etc. If the book is in stock at a local bookstore (BookManager API), it’ll ask you to come pick it up for a date.

## Final Product

!["Home/Login"](https://github.com/BCerki/book-tinder/blob/master/docs/home-login.png?raw=true)
!["Info View"](https://github.com/BCerki/book-tinder/blob/master/docs/messages-view.png?raw=true)
!["Profile View"](https://github.com/BCerki/book-tinder/blob/master/docs/profile.png?raw=true)
!["Swipe View"](https://github.com/BCerki/book-tinder/blob/master/docs/swipe-view.png?raw=true)
!["Chatting"](https://github.com/BCerki/book-tinder/blob/master/docs/chat.gif?raw=true)
!["Rejecting a Cover"](https://github.com/BCerki/book-tinder/blob/master/docs/swipeleft.gif?raw=true)
!["Liking a Cover"](https://github.com/BCerki/book-tinder/blob/master/docs/swiperight.gif?raw=true)

## Setup

Install dependencies with `npm install`.

Back end
"dependencies":
"body-parser": "^1.18.3",
"crawler-request": "^1.2.2",
"express": "^4.16.4",
"form-data": "^4.0.0",
"lodash": "^4.17.21",
"node-fetch": "^2.6.1",
"nodemon": "^1.18.7",
"pg": "^8.6.0",

"devDependencies":
"axios": "^0.21.1",
"dotenv": "^10.0.0"

Front end
"dependencies":
"@material-ui/core": "^4.11.4",
"@material-ui/icons": "^4.11.2",
"@material-ui/lab": "^4.0.0-alpha.58",
"axios": "^0.18.1",
"crawler-request": "^1.2.2",
"react": "^16.8.6",
"react-dom": "^16.8.6",
"react-loadingg": "^1.7.2",
"react-scripts": "2.1.8",
"react-simple-chatbot": "^0.6.1",
"styled-components": "^5.3.0"

"devDependencies":
"animate.css": "^4.1.1",
"cheerio": "^1.0.0-rc.10",
"crawler-request": "^1.2.2",
"lodash": "^4.17.21",
"node-sass": "^4.12.0",
"pdf-parse": "^1.1.1",
"react-router-dom": "^5.2.0",
"react-tinder-card": "^1.4.0",
"react-transition-group": "^4.4.2",
"react-use-localstorage": "^3.5.3",
"sass-loader": "^11.1.1",
"sweetalert2": "^11.0.16",
"sweetalert2-react-content": "^4.0.1"

## Running the servers

The main important bit is that the React project has `proxy` set to `localhost:8080` in the `package.json` file, and that the Express app listens to port 8080 in `server.js`. Take a look!
You need **TWO** terminal windows/tabs for this (or some other plan for running two Node processes).
In one terminal, `cd` into `react-front-end`. Run `npm install` or `yarn` to install the dependencies. Then run `npm start` or `yarn start`, and go to `localhost:3000` in your browser.
In the other terminal, `cd` into `express-back-end`. Run `npm install` or `yarn` to install the dependencies, then `npm start` or `yarn start` to launch the server.
In the browser, you can click on the button and see the data get loaded.
If this doesn't work, please message me!

## Warnings & Tips

You will need to obtain the appropraite tokens for the respective APIs (Google Books, BookNet, Bookmanager) and save them as environment variables.
