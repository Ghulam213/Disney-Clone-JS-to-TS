import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import MovieList from "./MovieList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import {
  setMovies,
  selectMovies
} from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import { Movie } from "../types";

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const movies = useSelector(selectMovies)

  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      const movies: Movie[] = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Movie;
      });

      dispatch(
        setMovies(movies)
      );
    });
  }, [userName, dispatch]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      { movies && (
        <>
          <MovieList movies={movies.filter(mov => mov.type === 'recommend')} title="Recommended for You" />
          <MovieList movies={movies.filter(mov => mov.type === 'new')} title="New to Disney+" />
          <MovieList movies={movies.filter(mov => mov.type === 'original')} title="Originals" />
          <MovieList movies={movies.filter(mov => mov.type === 'trending')} title="Trending" />
        </>
      )
      }
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
