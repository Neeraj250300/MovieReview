// src/components/MovieSearch.js
import React, { useState } from 'react';
import './MovieSearch.css';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  const fetchMovie = async () => {
    const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
    const res = await fetch(`https://www.omdbapi.com/?t=${searchTerm}&apikey=${API_KEY}`);
    const data = await res.json();

    if (data.Response === 'True') {
      setMovie(data);
      setError('');
    } else {
      setMovie(null);
      setError('Movie not found!');
    }
  };

  return (
    <div className="movie-search">
      <h1>🎬 IMDb Movie Search</h1>
      <input
        type="text"
        placeholder="Enter movie name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={fetchMovie}>Search</button>

      {error && <p className="error">{error}</p>}

      {movie && (
        <div className="movie-card">
          <img src={movie.Poster} alt={movie.Title} />
          <h2>{movie.Title}</h2>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}</p>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
