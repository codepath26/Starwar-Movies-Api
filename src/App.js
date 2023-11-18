import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
const [movies , setMovies] = useState([]);
async function getMovies (){
 try{

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
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
