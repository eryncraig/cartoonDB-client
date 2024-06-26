import { Card } from "react-bootstrap";
import { MovieCard } from "../MovieCard/movie-card";

export const ProfileView = ({ user, movies, token, setUser, onAddToFavorites }) => {
  let favoriteMovies = movies.filter(m => user.favorites.includes(m._id));

  return (
    <>
      <Card>
        <Card.Title>{user.username}</Card.Title>
        <Card.Body>
          <Card.Text>{user.name}</Card.Text>
          <Card.Text>Your Favorites:</Card.Text>
        </Card.Body>
      </Card>
      {favoriteMovies.map((movie) => (
        <Col md={3} className="mb-4" key={movie.id}>
          <MovieCard movie={movie} onAddtoFavorites={onAddToFavorites} />
        </Col>
      ))}
    </>
  )

}