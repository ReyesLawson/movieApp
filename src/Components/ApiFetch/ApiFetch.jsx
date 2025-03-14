const apiKey = 'a48d8a8497a5c56fbf1b139ca52733af';
const genreId = 28; // For example, Action
const year = 1990; // Example year for 90s

fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&primary_release_year=${year}`)
  .then(response => response.json())
  .then(data => console.log(data.results));  // List of movies
