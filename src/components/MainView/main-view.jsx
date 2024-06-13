import { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";

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

  if (!user) {
    return <LoginView onLoggedIn={(user, token) => {
      setUser(user);
      setToken(token);
      localStorage.clear();
    }} />
  }

  if (selectedMovie) {
    let similarMovies = movies.filter(movie => movie.genre.name === selectedMovie.genre.name && movie.id !== selectedMovie.id);
    return (
      <>
        <MovieView movie={selectedMovie} onBackClick={() => {
          setSelectedMovie(null);
        }} />
        <hr />
        <h2>Similar Movies</h2>
        {
          similarMovies.map((movie) => {
            return (
              <MovieCard movie={movie} key={movie.id} onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }} />
            )
          })}
      </>
    )
  }


  if (movies.length === 0) {
    return <div>The list of movies is empty!</div>
  } else {
    return (
      <div>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
          }}
        >Logout</button>
        {movies.map((movie) => {
          return (
            <MovieCard movie={movie} key={movie.id} onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }} />
          );
        })}
      </div>
    )
  }
}