import { Button, Card, Col } from "react-bootstrap"
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import { MovieCard } from "../MovieCard/movie-card";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  const similarMovies = movie ? movies.filter(
    (m) => m.genre.name === movie.genre.name && m.id !== movie.id) : [];


  return (
    <>
      <Card>
        <Card.Img src={movie.image} className="w-100 img-fluid" />
        <Card.Title>
          {movie.title}
        </Card.Title>
        <Card.Text>
          Director: {movie.director.name}
        </Card.Text>
        <Card.Text>
          Released: {movie.year}
        </Card.Text>
        <Card.Text>
          {movie.summary}
        </Card.Text>
        <Link to={'/'}>
          <Button>Back</Button>
        </Link>
      </Card>
      <hr />
      <h2>Similar Movies</h2>
      {similarMovies.map((movie) => (
        <Col md={3} className="mb-4" key={movie.id}>
          <MovieCard movie={movie} />
        </Col>
      ))}


    </>
  )

}