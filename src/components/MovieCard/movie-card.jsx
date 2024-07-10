import PropTypes from "prop-types";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onAddToFavorites, onRemoveFavorite }) => {
  return (

    <Card className="bg-secondary text-light">
      <div className="image-container">
        <Card.Img variant="top" src={movie.image} className="img-fluid movie-image" />
      </div>
      <Card.Body>
        <Card.Title className="mb-2">{movie.title}</Card.Title>
        <Card.Subtitle className="mb-2">{movie.director.name}</Card.Subtitle>
        <div>
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button className="btn m-2">More</Button>
          </Link>
          {onAddToFavorites && (
            <Button className="btn m-2" role="button" type="button" aria-label="Button to add a favorite" onClick={() => onAddToFavorites(movie.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
              </svg>
            </Button>)
          }
          {onRemoveFavorite && (
            <Button className="btn m-2" role="button" type="button" aria-label="Button to remove a favorite" onClick={() => onRemoveFavorite(movie.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heartbreak-fill" viewBox="0 0 16 16">
                <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586M7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77" />
              </svg>
            </Button>)
          }

        </div>
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
  onAddToFavorites: PropTypes.func,
  onRemoveFavorite: PropTypes.func
}

