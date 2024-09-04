import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Row, Col } from "react-bootstrap";
import './movie-view.scss'; // Import custom CSS for MovieView

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const movie = movies.find((b) => b.id === movieId);
  const storedUser = user;

  useEffect(() => {
    if (user && user.FavoriteMovies) {
      const isFavorite = user.FavoriteMovies.includes(movieId);
      setIsFavorite(isFavorite);
    }
  }, [movieId, user]);

  const addToFavorite = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${storedUser.Username}/movies/${movieId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(
          `Failed to add movie to favorites: ${response.statusText} - ${errorDetails.message}`
        );
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsFavorite(true);

    } catch (error) {
      console.error("Error adding movie to favorites", error);
      alert(`Error: ${error.message}`);
    }
  };

  const removeFromFavorite = () => {
    fetch(
      `https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${storedUser.Username}/movies/${movieId}`,
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
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setIsFavorite(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="movie-view-container">
      <Row className="movie-view-row">
        <Col md={8} className="movie-info">
          <Card.Body>
            <Card.Header><h1>{movie.Title}</h1></Card.Header>
            <br />
            <Card.Text>
              <h2>{movie.Genre.Name}</h2>
            </Card.Text>
            <Card.Text>
              <h3>{movie.Director.Name}</h3>
            </Card.Text>
            <Card.Text>
              <h4>{movie.Description}</h4>
            </Card.Text>
            <Card.Text>
              <h3>{movie.Year}</h3>
            </Card.Text>
            <Link to={`/`}>
              <Button variant="secondary">Back</Button>
            </Link>
            <div>
              {isFavorite ? (
                <Button variant="danger" onClick={removeFromFavorite}>
                  Remove Favorite
                </Button>
              ) : (
                <Button variant="success" onClick={addToFavorite}>
                  Add Favorite
                </Button>
              )}
            </div>
          </Card.Body>
        </Col>
        <Col md={4} className="movie-poster">
          <Card.Img variant="top" src={movie.ImageURL} className="img-fluid"/>
        </Col>
      </Row>
    </div>
  );
};