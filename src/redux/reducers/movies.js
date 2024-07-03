import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    filter: "",
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    }
  }
});

export const { setMovies, setFilter } = moviesSlice.actions;

export default moviesSlice.reducer;