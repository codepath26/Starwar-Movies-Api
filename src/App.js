import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [error , setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function getMovies() {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(process.env.REACT_APP_URL);
      console.log(response.ok)
      if(!response.ok){
        throw new Error('Something Went Wrong')
      }
      const data = await response.json();
      const transformArray = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        };
      });
      setMovies(transformArray);
    } catch (err) {
      setError(err.message);
      
    }
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={getMovies}>Fetch Movies</button>
      </section>
      <section>
        {/* {isLoading ? <h1>Loading...</h1> : <MoviesList movies={movies} />} */}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Fount no Movie</p>}
        {!isLoading &&  error && <p>{error}</p>}
        {isLoading  && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
