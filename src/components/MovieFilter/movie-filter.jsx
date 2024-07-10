import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { setFilter } from "../../redux/reducers/movies";

export const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();

  return (
    <Form.Control
      className="border border-dark"
      type="text"
      placeholder="Search..."
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
    />
  )
}