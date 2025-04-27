import React, { useState, useEffect } from "react";
import "./GenreWeb.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';

function App() {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [randomMovie, setRandomMovie] = useState(null);
  const [cycling, setCycling] = useState(false);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const apiKey = "a48d8a8497a5c56fbf1b139ca52733af";

  // Fetch genres from TMDb API
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      })
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  const fetchAndStartCycling = () => {
    // Fetch movies based on the selected genre
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setCycling(true);
        let counter = 0;

        const intervalId = setInterval(() => {
          setCurrentMovieIndex(counter % data.results.length);
          counter++;
        }, 180);

        setTimeout(() => {
          clearInterval(intervalId);
          getRandomMovie();
        }, 4000);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  };

  // Select a random movie from the fetched movies
  const getRandomMovie = () => {
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setRandomMovie(movies[randomIndex]);
      setCycling(false);
      setShowInfo(false);
    }
  };

  return (
    <Container className="title">
      <h1 className="peralta-regular">Not Sure What To Watch ?</h1>

      {/* Dropdown for genres */}
      <select
        className="dropDown"
        onChange={(e) => setSelectedGenre(e.target.value)}
        value={selectedGenre}>
        <option value="">Select Genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <div className="overall-container ">
        <div className="icon-container">
          <button className="button-container" onClick={fetchAndStartCycling}>
            <i className="bi bi-camera-reels large-icon bi:hover"></i>
          </button>
        </div>

        <section className="movie-container">
          {cycling && movies.length > 0 && (
            <div className="">
              {/* <h2>{movies[currentMovieIndex]?.title}</h2> */}
              <img
                src={`https://image.tmdb.org/t/p/w200${movies[currentMovieIndex]?.poster_path}`}
                alt={movies[currentMovieIndex]?.title}
              />
            </div>
          )}

          {/* Display random movie */}
          {randomMovie && !cycling && (
            <div className="about-movie-button">
              {/* <h2>{randomMovie.title}</h2> */}
              <img
                src={`https://image.tmdb.org/t/p/w200${randomMovie.poster_path}`}
                alt={randomMovie.title}
              />
              {!showInfo ? (
                <button
                  className="bi bi-info-circle-fill d-flex justify-content-center mt-3 aboutButton"
                  onClick={() => setShowInfo(true)}></button>
              ) : (
                <p className="movieInfo">{randomMovie.overview}</p>
              )}
            </div>
          )}
        </section>
      </div>
    </Container>
  );
}

export default App;
