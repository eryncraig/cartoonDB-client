import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >{movie.title}</div>
  )
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.instanceOf(Date),
      death: PropTypes.instanceOf(Date)
    }),
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      definition: PropTypes.string.isRequired
    }),
    image: PropTypes.string,
    featured: PropTypes.bool
  })
}

