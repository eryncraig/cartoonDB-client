import { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";
import { Col, Row, Button } from "react-bootstrap";

export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null)

  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://cartoon-db-8718021d05a1.herokuapp.com/movies',
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            summary: movie.summary,
            director: {
              name: movie.director.name,
              bio: movie.director.bio,
              birth: movie.director.birth,
              death: movie.director.death
            },
            genre: {
              name: movie.genre.name,
              definition: movie.genre.definition
            },
            image: movie.imagePath,
            featured: movie.featured
          };
        });
        setMovies(moviesFromApi);
      })
  }, [token]);

  const similarMovies = selectedMovie ? movies.filter(
    (movie) => movie.genre.name === selectedMovie.genre.name && movie.id !== selectedMovie.id) : [];


  const handleLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col>
          <LoginView onLoggedIn={handleLoggedIn} /> or < SignupView />
        </Col>
      ) : selectedMovie ? (
        <>
          <Col md={8}>
            <MovieView movie={selectedMovie} onBackClick={() => {
              setSelectedMovie(null);
            }} />
          </Col>
          <hr />
          <h2>Similar Movies</h2>
          {similarMovies.map((movie) => (
            <Col md={2} className="mb-5" key={movie.id}>
              <MovieCard movie={movie} onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }} />
            </Col>
          ))}

        </>
      ) : movies.length === 0 ? (
        <div>The list of movies is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard movie={movie} onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }} />
            </Col>
          ))}
          <Button
            md={6}
            variant="primary"
            onClick={handleLogout}
          >Logout</Button>
        </>
      )}
    </Row>
  )
}
