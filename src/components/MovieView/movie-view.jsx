import { Button, Card, Col, Row } from "react-bootstrap"
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import { MovieCard } from "../MovieCard/movie-card";

export const MovieView = ({ movies, onAddToFavorites, onRemoveFavorite }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  const similarMovies = movie ? movies.filter(
    (m) => m.genre.name === movie.genre.name && m.id !== movie.id) : [];


  return (
    <>
      <Row>
        <Card>
          <Card.Img src={movie.image} className="w-100 img-fluid" />
          <Card.Title>
            {movie.title}
          </Card.Title>
          <Card.Text>
            Director: {movie.director.name}
            <br />
            Released: {movie.year}
          </Card.Text>
          <Card.Text className="">
            {movie.summary}
          </Card.Text>
          <div className="d-grid gap-2 col-2">
            <Link to={'/'}>
              <Button className="btn-md w-50">Back</Button>
            </Link>
            <Col className="btn-group mb-2" lg={4}>
              {onAddToFavorites && (
                <Button className="btn-md" onClick={() => onAddToFavorites(movie.id)}>❤️</Button>)
              }
              {onRemoveFavorite && (
                <Button className="btn-md" onClick={() => onRemoveFavorite(movie.id)}>💔</Button>)
              }
            </Col>
          </div>
        </Card>
      </Row>
      <Row>
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => (
          <Col sm={12} md={6} lg={3} className="mb-4" key={movie.id}>
            <MovieCard movie={movie} />
          </Col>
        ))}

      </Row>
    </>
  )

}