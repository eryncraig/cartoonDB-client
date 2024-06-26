import PropTypes from "prop-types";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onAddToFavorites, onRemoveFavorite }) => {
  return (

    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} className="img-fluid" />
      <Card.Body className="h-100">
        <Card.Title className="mb-3">{movie.title}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">{movie.director.name}</Card.Subtitle>
        <div className="d-grid gap-2">
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button className="btn-md">Read More</Button>
          </Link>
          <Row> <Col className="btn-group" lg={4}>
            {onAddToFavorites && (
              <Button className="btn-md" onClick={() => onAddToFavorites(movie.id)}>❤️</Button>)
            }
            {onRemoveFavorite && (
              <Button className="btn-md" onClick={() => onRemoveFavorite(movie.id)}>💔</Button>)
            }
          </Col></Row>
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

