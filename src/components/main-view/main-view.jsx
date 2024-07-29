import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return; 

    fetch("https://jp-movies-flix-9cb054b3ade2.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesApi = movies.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            ImageURL: movie.ImageURL,
            Director: [{
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
              Birth: movie.Director.Birth,
              Death: movie.Director.Death
            }],            
            Genre: [{
              Name: movie.Genre.Name,
              Description: movie.Genre.Description
            }],
            Year: movie.Year,
            Featured: movie.Featured
          };
        });
        setMovies(moviesApi);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

  // useEffect(() => {
  //   fetch("https://jp-movies-flix-9cb054b3ade2.herokuapp.com/movies")
  //     .then((response) => response.json())
  //     .then((movies) => {
  //       const moviesApi = movies.map((movie) => {
  //         return {
  //           id: movie._id,
  //           Title: movie.Title,
  //           Description: movie.Description,
  //           ImageURL: movie.ImageURL,
  //           Director: [{
  //             Name: movie.Director.Name,
  //             Bio: movie.Director.Bio,
  //             Birth: movie.Director.Birth,
  //             Death: movie.Director.Death
  //           }],            
  //           Genre: [{
  //             Name: movie.Genre.Name,
  //             Description: movie.Genre.Description
  //           }],
  //           Year: movie.Year,
  //           Featured: movie.Featured
  //         };
  //       });

  //       setMovies(moviesApi);
  //     });
  // }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  );
};
