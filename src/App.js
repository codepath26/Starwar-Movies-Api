import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
const [movies , setMovies] = useState([]);
const [isLoading , setIsLoading] = useState(false);
async function getMovies (){
 try{
    setIsLoading(true);
   const response = await fetch(process.env.REACT_APP_URL);
   const data = await response.json();
   const transformArray = data.results.map(movie =>{
    return {
      id : movie.episode_id ,  
      title :movie.title ,
      releaseDate :movie.release_date ,
      openingText : movie.opening_crawl,

    }
  })
  setMovies(transformArray);
  setIsLoading(false);
  }catch(err){
    console.log(err);
  }


}

  return (
    <React.Fragment>
      <section>
        <button onClick={getMovies}>Fetch Movies</button>
      </section>
      <section>
       {

       isLoading ?  <h1>Loading...</h1>: <MoviesList movies={movies} />
       }
      </section>
    </React.Fragment>
  );
}

export default App;
