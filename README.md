# Live Demo
To see the app in action, go to [Movie Review Demo](https://quarantine-movie.herokuapp.com/)

# Project Specification
A prototype that allows users to search for and save movies in the user watchlist. Users will be able to search for particular movies based on genre. This prototype also allows user to create a review for a movie and use live support to interact with online agent for any feedbacks and concerns.

# Features
*	Filter: filter movies by genre
*	Sort: sort all movies by rating
*	Save movies: save a movie to a watchlist (login user only)
*	Create a review: write a review for a particular movie (login user only)
*	Onboarding support: a new user will be taken through an onboarding process to learn how to   use the app
*	Onboarding help: as even expert users need support sometimes, this a refresher for onboarding if needed
*	Live support: allows users to chat with online agent (login user only)
*	Sign up: registers a new account (does not allow multiple users to have the same username)

# How to Use Live Support Feature
When a user clicks on "join room" button, open another tag on your browser to sign in as admin to chat with the user. username: admin, password: admin. Live chat feature supports one to many simultaneous users (one tech support to many users). Run the app on three different tabs. Sign in as admin on one of the tabs, and sign in as users on rest of them. One of the users can hit "join room" to start a conversation with admin, and hit "leave room" to end a chat session when the conversation is over. After a user leaves a room, any users can hit "join room" to start a new chat session.

# Managing State, Data, and Server
* Use Redux and mock movie data
* Use Firebase to store users and reviews
* Keep users informed of application state when a potentially slow request is initiated i.e. searching or loading is taking too long
* Use Socket.IO to implement client and server for chat room feature.
