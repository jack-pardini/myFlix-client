import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: 'Gladiator',
      Director: {
        Name: 'Ridley Scott:',
        Bio: 'Sir Ridley Scott GBE is an English filmmaker. He is best known for directing films in the science fiction, crime and historical drama genres. His work is known for its atmospheric and highly concentrated visual style.',
        Birth: '1937',
        Death: 'N/A'
      },
      Genre: {
        Name: 'Action',
        Description: 'A film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases. Action films tend to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero.'
      },
      Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
      ImageURL: 'https://m.media-amazon.com/images/I/81QVTiMK1wL._SL1500_.jpg',
      Year: '2000',
      Featured: true
    },  
    {
      id: 2,
      Title: 'Fight Club',
      Director: {
        Name: 'David Fincher',
        Bio: 'David Andrew Leo Fincher is an American film director. His films, most of which are psychological thrillers, have collectively grossed over $2.1 billion worldwide and have received numerous accolades, including three nominations for the Academy Awards for Best Director.',
        Birth: '1962',
        Death: 'N/A'
      },
      Genre: {
        Name: 'Drama',
        Description: 'In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
      },
      Description: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
      ImageURL: 'https://m.media-amazon.com/images/I/31CauYmKHlL.jpg',
      Year: '1999,',
      Featured: false
    },
    {
      id: 3,
      Title: 'Goodfellas',
      Director: {
        Name: 'Martin Scorsese',
        Bio: 'Martin Charles Scorsese is an American filmmaker. He emerged as one of the major figures of the New Hollywood era. He has received many accolades, including an Academy Award, four BAFTA Awards, three Emmy Awards, a Grammy Award, and three Golden Globe Awards.',
        Birth: '1942',
        Death: 'N/A'
      },
      Genre: {
        Name: 'Drama',
        Description: 'In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
      },
      Description: 'The story of Henry Hill and his life in the mafia, covering his relationship with his wife Karen and his mob partners Jimmy Conway and Tommy DeVito.',
      ImageURL: 'https://m.media-amazon.com/images/I/81NuuGhiNmL._SL1500_.jpg',
      Year: '1990,',
      Featured: false
    }  
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
    </div>
  );
};
