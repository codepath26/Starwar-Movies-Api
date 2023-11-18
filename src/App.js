import React, {  useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [retring, setRetring] = useState(false);
  let timmer;
  let response;
  
  async function getMovies() {
    try {
    
      setIsLoading(true);
      setError(null);

      response = await fetch(process.env.REACT_APP_URL);

      console.log(response.ok);
      if (!response.ok) {
        throw new Error("Something Went Wrong");
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

      setRetring(true);
      setError(err.message);
      clearInterval(timmer);
    }
    setIsLoading(false);
  }

  const stopRetring = () => {
    setRetring(false);
    clearInterval(timmer);
  };
  const onGetMovies = () => {

    timmer = setInterval(async () => {
      getMovies();
    
    }, 4000);
    console.log("timer",timmer)
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={onGetMovies}>Fetch Movies</button>
      </section>
      <section>
        {/* {isLoading ? <h1>Loading...</h1> : <MoviesList movies={movies} />} */}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Fount no Movie</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading... Retring...</p>}
      </section>
      {retring && (
        <div className="cancel">
          <button onClick={stopRetring}>Cancel</button>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
