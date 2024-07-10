import { Button, Card, Col, Row } from "react-bootstrap"
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import { MovieCard } from "../MovieCard/movie-card";
import { useSelector } from "react-redux";

export const MovieView = ({ onAddToFavorites, onRemoveFavorite }) => {
  // finds the movieId variable using the uri
  const { movieId } = useParams();

  // uses state store from redux to pass movie state (vs props)
  const movie = useSelector((state) => state.movies.movies.find((movie) => movie.id === movieId));
  const movies = useSelector((state) => state.movies.movies); // Accessing movies array


  //makes a list of similar movies in the same view for recommendation
  const similarMovies = movie ? movies.filter(
    (m) => m.genre.name === movie.genre.name && m.id !== movie.id) : [];


  return (
    <>
      <Row>
        <Card className="mb-5 border border-0">
          <Card.Img src={movie.image} className="w-100 img-fluid mb-2" aria-label="Image of movie poster" alt={`Poster for ${movie.title}.`} />
          <Card.Title>
            {movie.title}
          </Card.Title>
          <Card.Text aria-label="Director name and movie release year.">
            Director: {movie.director.name}
            <br />
            Released: {movie.year}
            <br />
            Genre: {movie.genre.name}
          </Card.Text>
          <Card.Text className="" aria-label={`Summary for ${movie.title}`} >
            {movie.summary}
          </Card.Text>
          <div className="mx-auto">
            <Link to={'/'} aria-label="Back button to homepage">
              <Button className="btn-lg m-2">Back</Button>
            </Link>
            {onAddToFavorites && (
              <Button className="btn-lg m-2" onClick={() => onAddToFavorites(movie.id)} aria-label="Add to favorites button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                </svg>
              </Button>)
            }
            {onRemoveFavorite && (
              <Button className="btn-lg m-2" onClick={() => onRemoveFavorite(movie.id)} aria-label="Remove from favorites button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heartbreak-fill" viewBox="0 0 16 16">
                  <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586M7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77" />
                </svg>
              </Button>)
            }
          </div>
        </Card>
      </Row>
      <Row>
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => (
          <Col lg={6} className="mb-4" key={movie.id}>
            <MovieCard movie={movie} aria-label={`Thumbnail for ${movie.title}`} onAddToFavorites={onAddToFavorites} onRemoveFavorite={onRemoveFavorite} />
          </Col>
        ))}

      </Row>
    </>
  )

}