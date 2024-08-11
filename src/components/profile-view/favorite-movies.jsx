import React from "react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import { Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ user, setUser, favoriteMovies, movies }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const movie = movies.find((b) => b.id === movieId);

  useEffect(() => {
    if (user && user.FavoriteMovies) {
      const isFavorite = user.FavoriteMovies.includes(movieId);
      setIsFavorite(isFavorite);
    }
  }, [movieId, user]);
  console.log('movies in favs ', movies)
  let favoriteMoviesArr = movies.filter((m) => favoriteMovies.includes(m.id));
  
  const removeFromFavorite = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

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
    <div>
      Favorite Movies
      {favoriteMoviesArr.length === 0 ? (
        <p>No favorite movies</p>
      ) : (
        favoriteMoviesArr.map((movie) => (
          <Card key={movie.id} className="mb-3">
            <Card.Body>
              <img src={movie.ImageURL} />
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Director.Name}</Card.Text>
              <Link to={`/movies/${movie.id}`}>
                <Button variant="primary">Movie Info</Button>
                <Button variant="danger" onClick={() => removeFromFavorite(movie.id)}>Remove Favorite</Button>
              </Link>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

  // return (
  //   <>
  //     <Row>
  //       <Col xs={12}>
  //         <h4>Favorite Movies</h4>
  //       </Col>
  //     </Row>
  //     <Row>
  //       <Col>
  //         {favoriteMoviesArr.length === 0 ? (
  //           <p>No favorite movies</p>
  //         ) : (
  //           favoriteMoviesArr.map((movie) => (
  //             <Col xs={12} md={6} lg={3} key={movie.id}>
  //               <img src={movie.ImageURL} />
  //               <Link to={`/movies/${movie.id}`}>
  //                 <Button variant="primary">Movie Info</Button>
  //                 <Button variant="danger" onClick={() => removeFromFavorite(movie.id)}>Remove Favorite</Button>
  //               </Link>
  //             </Col>
  //           )))
  //           }
  //       </Col>
  //     </Row>
  //   </>
  // )

FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired
};

export default FavoriteMovies;
