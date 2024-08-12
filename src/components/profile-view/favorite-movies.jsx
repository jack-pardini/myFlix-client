import React from "react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import { Card, Button, Row, Col, Container, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ user, setUser, favoriteMovies, movies }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const movie = movies.find((b) => b.id === movieId);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user && user.FavoriteMovies) {
      const isFavorite = user.FavoriteMovies.includes(movieId);
      setIsFavorite(isFavorite);
    }
  }, [movieId, user]);
  console.log("movies in favs ", movies);
  let favoriteMoviesArr = movies.filter((m) => favoriteMovies.includes(m.id));

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

  // return (
  //   <Container>
  //     <Row>
  //       <Col xs={12}>
  //         <h2>Favorite Movies</h2>
  //       </Col>
  //     </Row>
  //     <Row>
  //       {favoriteMoviesArr.length === 0 ? (
  //         <h2>No favorite movies</h2>
  //       ) : (
  //         favoriteMoviesArr.map((movie) => (
  //           <Col xs={12} md={6} lg={3} key={movie.id}>
  //             <Figure>
  //             <Link to={`/movies/${movie.id}`}>
  //               <Figure.Image
  //                 src={movie.ImageURL}
  //                 alt={movie.Title}
  //               />
  //               <Figure.Caption>
  //                 {movie.Title}
  //               </Figure.Caption>
  //               </Link>
  //             </Figure>
  //             <Button variant="primary">Movie Info</Button>
  //             <Button variant="danger" onClick={() => removeFromFavorite(movie.id)}>Remove Favorite</Button>
  //           </Col>
  //         ))
  //       )}
  //     </Row>
  //   </Container>
  // );

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
                  <img src={movie.ImageURL} />
                  <Card.Title>
                    <h2>{movie.Title}</h2>
                  </Card.Title>
                  <Card.Text>{movie.Director.Name}</Card.Text>
                  <Link to={`/movies/${movie.id}`}>
                    <Button variant="primary">Movie Info</Button>
                    <Button variant="danger" onClick={removeFromFavorite}>
                      Remove Favorite
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
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
  favoriteMovies: PropTypes.array.isRequired,
};

export default FavoriteMovies;
