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
            <Card.Header className="text-center fs-1">{movie.Title}</Card.Header>
            <br />
            <Card.Text>
              <strong>Director</strong>: {movie.Director.Name}
            </Card.Text>
            <Card.Text>
              <strong>Genre</strong>: {movie.Genre.Name}
            </Card.Text>
            <Card.Text>
              <strong>Description</strong>: {movie.Description}
            </Card.Text>
            <Card.Text>
              <strong>Year</strong>: {movie.Year}
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
          <Card.Img variant="top" src={movie.ImageURL} className="img-fluid" />
        </Col>
      </Row>
    </div>
  );
};










// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router";
// import { Link } from "react-router-dom";
// import { Button, Card, Row } from "react-bootstrap";

// export const MovieView = ({ movies, user, token, setUser }) => {
//   const { movieId } = useParams();
//   const [isFavorite, setIsFavorite] = useState(false);
//   const movie = movies.find((b) => b.id === movieId);
//   const storedUser = user;

//   useEffect(() => {
//     if (user && user.FavoriteMovies) {
//       const isFavorite = user.FavoriteMovies.includes(movieId);
//       setIsFavorite(isFavorite);
//     }
//   }, [movieId, user]);

//   const addToFavorite = async () => {
//     console.log(user);
//     console.log(user.Username);

//     const token = localStorage.getItem("token");
//     console.log(movieId);

//     try {
//       const response = await fetch(
//         `https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${storedUser.Username}/movies/${movieId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (!response.ok) {
//         const errorDetails = await response.json();
//         throw new Error(
//           `Failed to add movie to favorites: ${response.statusText} - ${errorDetails.message}`
//         );
//       }
      
//       const updatedUser = await response.json();
//       // const data = await response.json();
//       console.log("Movie added to favorites");

//       setUser(updatedUser);
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       setIsFavorite(true);

//     } catch (error) {
//       console.error("Error adding movie to favorites", error);
//       alert("Error: ${error.message");
//     }
//   };

//   <button onClick={() => addToFavorite()}>Add to Favorites</button>;

//   const removeFromFavorite = () => {
//     fetch(
//       `https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${storedUser.Username}/movies/${movieId}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//       })
//       .then((data) => {
//         setUser(data);
//         localStorage.setItem("user", JSON.stringify(data));
//         setIsFavorite(false);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };
//   return (
//     <Card className="h-100 w-100">
//       <Card.Img variant="top" src={movie.ImageURL} />
//       <Card.Body>
//         <Card.Header className="text-center fs-1">{movie.Title}</Card.Header>
//         <br></br>
//         <Card.Text>
//           <strong>Director</strong>: {movie.Director.Name}
//         </Card.Text>
//         <Card.Text>
//           <strong>Genre</strong>: {movie.Genre.Name}
//         </Card.Text>
//         <Card.Text>
//           <strong>Description</strong>: {movie.Description}
//         </Card.Text>
//         <Card.Text>
//           <strong>Year</strong>: {movie.Year}
//         </Card.Text>
//         <Link to={`/`}>
//           <button variant="secondary">Back</button>
//         </Link>
//         <div>
//           {isFavorite ? (
//             <Button variant="danger" onClick={removeFromFavorite}>
//               Remove Favorite
//             </Button>
//           ) : (
//             <Button variant="green" className="btn-green" onClick={addToFavorite}>
//               Add Favorite
//             </Button>
//           )}
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };