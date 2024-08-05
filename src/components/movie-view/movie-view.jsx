// import PropTypes from "prop-types";
// import { useParams } from "react-router";
// import { Link } from "react-router-dom";

// export const MovieView = ({ movies }) => {
//   const { movieId } = useParams();

//   const movie = movies.find((m) => m.id === movieId);
//   console.log(movie);
//   console.log(movie.Title);
//   return (
//     <div>
//       <div>
//         <img className="w-100" src={movie.ImageURL} />
//       </div>
//       <div>
//         <span>Title: </span>
//         <span>{movie.Title}</span>
//       </div>
//       <div>
//         <span>Description: </span>
//         <span>{movie.Description}</span>
//       </div>
//       <div>
//         <span>Year: </span>
//         <span>{movie.Year}</span>
//       </div>
//       <div>
//         <span>Genre: </span>
//         <span>{movie.Genre.Name}</span>
//       </div>
//       <div>
//         <span>Director: </span>
//         <span>{movie.Director.Name}</span>
//       </div>
//       {/* <div>
//         <span>Featured: </span>
//         <span>{movie.Featured}</span>
//       </div> */}
//       <Link to={`/`}>
//         <button className="back-button" style={{ cursor: "pointer" }}>Back</button>
//       </Link>
//     </div>
//   );
// };

// // MovieView.propTypes = {
// //   movie: PropTypes.shape({
// //     Title: PropTypes.string.isRequired,
// //     ImageURL: PropTypes.string.isRequired,
// //     Year: PropTypes.string.isRequired
// //   }).isRequired,
// // };




import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Row } from "react-bootstrap";

export const MovieView = ({ movies, user, token, setUser }) => {
    const { movieId } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const movie = movies.find((b) => b.id === movieId);

    useEffect(() => {
        if(user && user.FavoriteMovies)  {
            const isFavorite = user.FavoriteMovies.includes(movieId);
            setIsFavorite(isFavorite);
        }
    }, [movieId, user]);

    const addtoFavorite = () => {
        fetch(`https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${user.username}/${movieId}`,
        {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }).then((response) => {
            if (response.ok) {
              return response.json();
            }
        })
        .then((data) => {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setIsFavorite(true);
        })
        .catch((e) => {
            console.log(e);
        });
    };
    const removefromFavorite = () => {
        fetch(`https://jp-movies-flix-9cb054b3ade2.herokuapp.com/users/${user.username}/${movieId}`,
        {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }).then((response) => {
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
        
        <Card className="h-100 w-100">
        <Card.Img variant="top" src={movie.ImageURL} />
            <Card.Body>
               <Card.Header className="text-center fs-1">{movie.Title}</Card.Header>
               <br></br>
                    <Card.Text><strong>Director</strong> - {movie.Director.Name}</Card.Text>
                    <Card.Text><strong>Genre</strong> - {movie.Genre.Name}</Card.Text>
                    <Card.Text><strong>Description</strong> - {movie.Description}</Card.Text>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>  
            <div>
                {isFavorite ? (
                    <Button variant="danger" onClick={removefromFavorite}>Remove from favorite</Button>
                ) : (
                    <Button variant="primary" onClick={addtoFavorite}>Add to favorite</Button>   
                )}
            </div>
            </Card.Body>
        </Card>
        
    )
}