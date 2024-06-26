import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onAddToFavorites }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} className="img-fluid" />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.name}</Card.Text>
        {onAddToFavorites && (
          <Button onClick={() => onAddToFavorites(movie.id)}>❤️</Button>)
        }
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button>Read More</Button>
        </Link>
      </Card.Body>
    </Card>
  )
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string,
      death: PropTypes.string
    }),
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      definition: PropTypes.string.isRequired
    }),
    image: PropTypes.string,
    featured: PropTypes.bool
  }).isRequired,
  onAddToFavorites: PropTypes.func
}

