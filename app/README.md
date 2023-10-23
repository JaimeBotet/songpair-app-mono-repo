# SongPair - Master Thesis

This project contains the frontend part of the Master Thesis

This Repository contains following:

- React JS front end application
- Redux implementation with combined store of user and community reducers
- React containers for each page
- Hook to monitor and update location of the app user
- Socket.io implementation for chat services

## Usage

Our application is a special social-platform where users can see what music other users are listening to, through a synchronization of our app with **Spotify**.
For this the new user must follow such steps as:

1. Click **sign up** option
2. User will be redirected to spotify to confirm their Spotify credentials
3. Once user confirms their spotify account, it will be redirected back to the app, where he/she will be prompted to create a new _SongPair_ account.
4. After a _SongPair_ account is created and user is logged in, they can open the map inside the app and see what other nearby (15 km radius) users are listening to.
5. User has then 3 options:
   1. Give a like to other nearby user song
   2. Chat with another user
   3. View other users profile
6. The user can also acces from the main dashboard view to already opened chats with other users

## Heroku Deployed App

[Song Pair](https://songpair-frontend.herokuapp.com/)

## Authors

**Guilherme Carra** & **Jaime Botet**

## Repository

[Code Assembler](https://code.assemblerschool.com/guilherme-carra/Songpair-frontend-TFM.git)
