import { useEffect, useState } from "react";
import { MovieList } from "../MovieList/movie-list";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";
import { ProfileView } from "../ProfileView/profile-view";
import { NavigationBar } from "../NavigationBar/navigation-bar";
import { setMovies } from "../../redux/reducers/movies";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {

  // Store the user and auth in the local storage to persist the login
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  // hooks and redux to access the user and movie states
  const [user, setUser] = useState(storedUser ? storedUser : null)
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();

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
        dispatch(setMovies(moviesFromApi));
      })
  }, [token, dispatch]);


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
      method: 'PATCH',
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
                )}
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
                      <MovieView onAddToFavorites={addToFavorites} onRemoveFavorite={removeFromFavorites} />
                    </Col>
                  </>
                )}

              </>
            }
          />
          <Route
            path="/"
            element={

              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <MovieList movies={movies} onAddToFavorites={addToFavorites} onRemoveFavorite={removeFromFavorites} />
              )

            }

          />
        </Routes>
      </Row>
    </BrowserRouter>
  )
}
