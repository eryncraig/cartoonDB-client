import { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";
import { ProfileView } from "../ProfileView/profile-view";
import { Col, Row, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { NavigationBar } from "../NavigationBar/navigation-bar";

export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null)
  const [movies, setMovies] = useState([]);
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
            year: movie.year,
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

  const addToFavorites = (movieId) => {
    if (!token) {
      return;
    }

    const movie = movies.find((m) => m.id === movieId)

    if (!movie) {
      console.error('Movie not found');
      return;
    }

    fetch(`https://cartoon-db-8718021d05a1.herokuapp.com/users/${user.username}/movies/${movieId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          const updatedUser = { ...user, favorites: [...user.favorites, movieId] };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          alert(`Added ${movie.title} to your favorites!`)
        } else {
          console.error('Failed to add movie to favorites');
        }
      }).catch((error) => {
        console.error('Error: ', error);
      })
  };

  const removeFromFavorites = (movieId) => {
    fetch(`https://cartoon-db-8718021d05a1.herokuapp.com/users/${user.username}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          const updatedFavorites = user.favorites.filter(id => id !== movieId);
          const updatedUser = { ...user, favorites: updatedFavorites };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } else {
          console.error('Failed to remove movie from favorites');
        }
      }).catch((error) => {
        console.error('Error: ', error);
      })
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Row className="justify-content-md-center row-cols-auto">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    < SignupView />
                  </Col>
                )}{" "}
              </>
            } />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={handleLoggedIn} />
                  </Col>
                )
                }
              </>
            }
          />
          <Route
            path="/users/:username"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <Col md={8}>
                      <ProfileView user={user} movies={movies} token={token} setUser={setUser} onAddToFavorites={addToFavorites} onRemoveFavorite={removeFromFavorites} />
                    </Col>
                  </>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list of movies is empty!</Col>
                ) : (
                  <>
                    <Col className="col-md-8 col-sm-6">
                      <MovieView movies={movies} onAddToFavorites={addToFavorites} onRemoveFavorite={removeFromFavorites} />
                    </Col>
                  </>
                )}

              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col sm={12} md={6} lg={3} className="mb-5" key={movie.id} >
                        <MovieCard movie={movie} onAddToFavorites={addToFavorites} onRemoveFavorite={removeFromFavorites} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  )
}
