import React, { useState, useEffect } from 'react';

function GenreWeb() {
  const [genres, setGenres] = useState([]);  // Initialize genres as an empty array
  const [movies, setMovies] = useState([]);  // Initialize movies as an empty array
  const [selectedGenre, setSelectedGenre] = useState('');
  const [randomMovie, setRandomMovie] = useState(null);
  const apiKey = 'a48d8a8497a5c56fbf1b139ca52733af';  // Your API key
};
  useEffect(() => {
    // Fetch genres from TMDb API
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)

      .then(response => response.json())
      .then(data => {
        console.log('Fetched Genres:', data.genres); 
        setGenres(data.genres || []);  
      })
      .catch(error => console.error('Error fetching genres:', error));  
    },[]);

  const fetchMovies = () => {
    if (!selectedGenre) {
      console.warn('No genre selected');  
      return; 
    }

    // Fetch movies based on selected genre
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Movies:', data.results); 
        setMovies(data.results || []);  
      })
      .catch(error => console.error('Error fetching movies:', error));  
  };

  const getRandomMovie = () => {
    console.log('Movies array:', movies);  
    if (!movies || movies.length === 0) {
      console.warn('No movies available to suggest'); 
      alert('No movies available to suggest.');
      return;
    }

    // Pick a random movie from the list of movies
    const randomIndex = Math.floor(Math.random() * movies.length);
    setRandomMovie(movies[randomIndex]);
  };

  return (
    <div>
      <h1>Random Movie Suggestion</h1>
      <select onChange={(e) => setSelectedGenre(e.target.value)}>
        <option value="">Select Genre</option>
        {(genres || []).map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <button onClick={fetchMovies}>Fetch Movies</button>
      <button onClick={getRandomMovie}>Suggest Random Movie</button>

      {randomMovie && (
        <div>
          <h2>{randomMovie.title}</h2>
          <img src={`https://image.tmdb.org/t/p/w200${randomMovie.poster_path}`} alt={randomMovie.title} />
          <p>{randomMovie.overview}</p>
        </div>
      )}
    </div>
  );


export default GenreWeb;
