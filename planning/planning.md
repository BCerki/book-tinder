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
  - see my matches section (to-read list, ultimately) and search them/messaging center
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
Boilerplate: Yes please! Except chatbot
APIs:

- Google books (https://developers.google.com/books/docs/v1/using)
- Booknet (https://booknetcanada.atlassian.net/wiki/spaces/UserDocs/pages/1394723/Bibliographic+Data+Distribution#BibliographicDataDistribution-onixweb)
- Bookmanager (https://bookmanager.com/public/api/services/shop-local),

##

## Andy questions

- ERD !!!!
- routes
- boilerplate
- chatbot (back or front)
- pitfalls
- Stack
- XML data from booknet
- quick way to test apis

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

## Routes

/api

/api/books --- all books in db

/api/conversations --- all conversations in db

/api/users --- all users in db

/api/users/1/conversations --- query: grab all conversations for a particular user
--- front-end uses this to populate info view

CONVERSATIONS = MATCHES
/api/users/1/conversations/1
---front-end uses this to grab the book id

/api/users/1/books --- query: grab from the all books table everything that isn't in the conversations for that use and that isn't blocked for that user
--- front-end uses this to populate the swipe view

api/users/1/profile --- DONE

api/users/1/profile/1
--- front-end uses this for the profile view

## Book flirts

Tell me more--google api long description
Send pictures--interior image
What's your favourite quote? --book quote
Can I see a photo of your behind? Would you like to see me from behind?--back cover
Want to see what I look like under the covers?--interior image
Want to see/join my table of conquests?--TOC
Want to see if I come from good stock? Here are my parents--author photo
Maybe when you pick me up and bring me back to your place, I could teach you a thing or two?--teacher's guide
Maybe we could end the night between my endsheets?

Tired of borrowing books at the library? Want to check out something fresh and novel?
No, YOU''RE spineless
Reading me is riding a magic carpet--I''ll show you a whole new world
When you're done reading me, I think we should write a new book together

How would you feel about romancing the tome with me?
I think there's something wrong with my ISBN number--it's not your phone number
Want to trade your phone number for my isbn
I think there's seomthing wrong with your phone number
If you want to feel something beautiful, hold me in your hands
You know what my cover is made of? Datefriend material
It's a good thing I have a library card because I'm totally checking you out
I'm good with words
When you're done reading me, I think we should write a new book together
//Tired of borrowing books at the library? Want to check out something fresh and novel?
No, YOU''RE spineless
