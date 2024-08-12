import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ user, setUser, favoriteMovies, movies }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user && user.FavoriteMovies) {
      const isFavorite = user.FavoriteMovies.includes(movieId);
      setIsFavorite(isFavorite);
    }
  }, [movieId, user]);

  let favoriteMoviesArr = movies.filter((m) => favoriteMovies.includes(m.id));

  const removeFromFavorite = (movieIdToRemove) => {
    fetch(
      `https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${storedUser.Username}/movies/${movieIdToRemove}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        // Update the user state and localStorage
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));

        // Remove the movie from the favoriteMoviesArr array
        const updatedFavoriteMovies = favoriteMoviesArr.filter(
          (movie) => movie.id !== movieIdToRemove
        );

        // Update the local state for favoriteMovies
        setUser((prevUser) => ({
          ...prevUser,
          FavoriteMovies: updatedFavoriteMovies.map((movie) => movie.id),
        }));

        setIsFavorite(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <Row>
        <h2>Favorite Movies</h2>
        {favoriteMoviesArr.length === 0 ? (
          <h2>No favorite movies</h2>
        ) : (
          favoriteMoviesArr.map((movie) => (
            <Col xs={12} md={6} lg={3} key={movie.id}>
              <Card className="mb-3">
                <Card.Body>
                  <img src={movie.ImageURL} alt={movie.Title} />
                  <Card.Title>
                    <h2>{movie.Title}</h2>
                  </Card.Title>
                  <Card.Text>
                    {movie.Director && movie.Director.Name
                      ? movie.Director.Name
                      : "Unknown Director"}
                  </Card.Text>
                  <Link to={`/movies/${movie.id}`}>
                    <Button variant="primary">Movie Info</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => removeFromFavorite(movie.id)}
                  >
                    Remove Favorite
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

FavoriteMovies.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  favoriteMovies: PropTypes.array.isRequired,
  movies: PropTypes.array.isRequired,
};

export default FavoriteMovies;
