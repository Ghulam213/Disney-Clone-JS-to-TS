import { createSlice } from "@reduxjs/toolkit";
import { Movie } from "../../types";

interface MovieState {
  movies: Movie[];
}

const initialState: MovieState = {
  movies: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { setMovies } = movieSlice.actions;

export const selectMovies = (state: { movie: MovieState }) =>
  state.movie.movies;

export default movieSlice.reducer;
