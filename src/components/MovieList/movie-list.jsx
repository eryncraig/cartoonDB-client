import React from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../MovieCard/movie-card";
import { MoviesFilter } from "../MovieFilter/movie-filter";
import { Col, Row } from "react-bootstrap";


export const MovieList = ({ onAddToFavorites, onRemoveFavorite }) => {
  const movies = useSelector((state) => state.movies.movies);
  const filter = useSelector((state) => state.movies.filter) || "";
  const normalFilter = filter.trim().toLowerCase();

  const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(normalFilter));

  return (
    <>
      <Row className="mb-4 mt-2 w-100">
        <MoviesFilter />
      </Row>
      <Row>
        {movies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          filteredMovies.map((movie) => (
            <Col className="mb-4" key={movie.id} md={3}>
              <MovieCard movie={movie} onAddToFavorites={onAddToFavorites} onRemoveFavorite={onRemoveFavorite} />
            </Col>
          ))
        )
        }
      </Row>
    </>
  )
}