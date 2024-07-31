import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);
  console.log(movie);
  console.log(movie.Title);
  return (
    <div>
      <div>
        <img className="w-100" src={movie.ImageURL} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Year: </span>
        <span>{movie.Year}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      {/* <div>
        <span>Featured: </span>
        <span>{movie.Featured}</span>
      </div> */}
      <Link to={`/`}>
        <button className="back-button" style={{ cursor: "pointer" }}>Back</button>
      </Link>
    </div>
  );
};

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     ImageURL: PropTypes.string.isRequired,
//     Year: PropTypes.string.isRequired
//   }).isRequired,
// };