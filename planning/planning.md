## 1a: Project Description

_Project title:_ TBD

_Project description:_ You can set up a profile with preferences for the books you want to “date” (age, price, length, interests, etc.) The app will present you with cover images and you can swipe recto/verso (right/left) for like/nope. If the book swipes right on you too (maybe all do, TBD), you get to message each other—the book will send you interior photos, quotes from itself (from Google Books and Booknet Canada APIs), predetermined book flirst, etc. If the book is in stock at a local bookstore (BookManager API), it’ll ask you to come pick it up for a date.
_Target audience:_ Tinder-generation readers, people who want to get books locally
_Team members:_ Brianna, Adrian, Michelle
_Mission:_ Matching diverse range of books as possible as diverse a range of people as possible. Advocates for all books/equal reach for all books (this will give local/smaller/non-celebrity books an even footing), free

## 1b: User Stories

As a user, I can:

- use the app on my phone
- make a profile (for demo, edit a pre-created profile) that includes:
  - genres (Tinder interests) (from a list, if you don't select any, it'll be random)
  - age preference (publication date)
  - location radius (IP address, ask for permission)
  - price, cheap/expensive
  - page count (introvert/extrovert)
  - maturity (Google mature/not mature(adventurous)
  - photo (optional, if we can think of a way to use it to make matches, color?)
- view books' covers
- swipe to like/dislike
- chat with the book (predetermined vs. any input TBD), ask questions and receive answers
- get propositioned by a book (book makes the first move)
- receive photos from book
- get asked out by a book to its location
- click one of three buttons/navigate to pages:
  - swipe section
  - see my matches section (to-read list, ultimately) and search them
  - messaging center
  - my profile edit
- block/unmatch with books (keep in our databse as no-go)

## 1c Wireframes

- swipey/home
- matches list
- messaging center
- actual chat
- profile edit
- it's a match popup
- landing page (login/signup)

## 1e

Front end: React, Material UI, SASS, Bootstrap?
Back end: Express
Database: Postgres
Testing: Cypress if time
Boilerplate: Yes please!
APIs:

- Google books (https://developers.google.com/books/docs/v1/using)
- Booknet (https://booknetcanada.atlassian.net/wiki/spaces/UserDocs/pages/1394723/Bibliographic+Data+Distribution#BibliographicDataDistribution-onixweb)
- Bookmanager (https://bookmanager.com/public/api/services/shop-local),

##

## Andy questions

- chatbot (back or front)
- pitfalls
- Stack
- XML data from booknet

STRETCH

- view books' profiles
- book will send unsolicited messages
- notifications for new messages
- search by description of cover--possible?

## Book flirts

- table of conquests
- Heeeeeeeey reader, when's the last time you had a novel encounter :wink:
- Cover Lover
- Romancing the Tome (play on Romancing the Stone, a funny 80’s movie)
- Wanna _~giggle_~ bookup?
- Uncover

## Misc to-do

- Attribute Booknet
