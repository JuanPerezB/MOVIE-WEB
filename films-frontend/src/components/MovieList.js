import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieList.css'; // Archivo CSS para estilos

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/inventory');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie._id} className="movie-item">
          {movie.coverImage && (
            <img
              src={`http://localhost:8080/uploads/${path.basename(movie.coverImage)}`}
              alt={movie.title}
              className="movie-image"
            />
          )}
          <h2>{movie.title}</h2>
          <p>Director: {movie.director}</p>
          <p>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
          <p>Genre: {movie.genre}</p>
          <p>Rating: {movie.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
