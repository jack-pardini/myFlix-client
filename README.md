# MyFlix-client

## Project Overview
MyFlix-client is a frontend web application for the movie database myFlix. This is a movie app that allows users create an account, find movies, view detailed information about the movies, add movies to a list of favorites, and manage their profile. It is built using the JavaScript library React and React Bootstrap, so the user interface is smooth, providing a user-friendly experience. The app showcases movies, including their description, directors information, release date, genre, and many other details.

## Features

**User Authentication**
New users can sign up to create an account, and log in and out.

**Movie Browsing**
Users can browse through a collection of movies that have been fetched from the backend API. 

**Movie Details**
If a user clicks on a movie, they will see detailed information about the movie.

**User Profile**
View and update user profile information.

**Favorite Movies**
A user can add a movie to a list of favorite movies to be accessed later. Once added, the movie can also be removed from the list of favorites.

**Search**
Search for movies by title using a search bar in the navigation.

## Dependencies
- JavaScript
- React
- React Router
- React Bootstrap
- Bootstrap
- Fetch API for HTTP requests

## File Structure
````
src/
│
├── components/
│   ├── login-view/
│   │   └── login-view.jsx
│   └── main-view/
│       ├── main-view.jsx
│   ├── movie-card/
│   │   └── movie-card.jsx
│   ├── movie-view/
│   │   └── movie-view.jsx
│   ├── navigation-bar/
│   │   └── navigation-bar.jsx
│   ├── profile-view/
│   │   ├── delete-account.jsx
|   |   ├── favorite-movies.jsx
|   |   ├── profile-update.jsx
│   │   └── profile-view.jsx
│   │   ├── user-info.jsx
│   ├── signup-view/
│   │   └── signup-view.jsx
├── index.jsx
└── index.scss
index.html
````

## Components
**MainView**
The main page of the application, responsible for routing and managing the application's state.

**NavigationBar**
Provides the top navigation bar with links to different routes and the search bar.

**MovieCard**
Displays basic movie information and allows users to add or remove movies from their list of favorites.

**MovieView**
Displays detailed movie information and allows users to add or remove movies from their list of favorites.

## Usage
- **Signup**: Navigate to the signup page to create a new account.
- **Login**: Navigate to the login page to access your account.
- **Browse Movies**: View the list of available movies.
- **View Movie Details**: Click on a movie card to see detailed information.
- **Manage Favorites**: Add or remove movies from your favorites list.
- **Update Profile**: Update your user profile information from the profile page.
- **Search**: Use the search bar to filter movies by title.

## Deployment
1. Build the application for production
````
npm run build
````
2. Deploy the build directory to your preferred web server or hosting service.

## Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Open a Pull Request.

## Hosting
This project is hosted on Netlify: https://myflix-movies-jp.netlify.app/