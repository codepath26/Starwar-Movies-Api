import React, {  useCallback, useEffect,useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovies/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [retring, setRetring] = useState(false);
  // let timmer;
  const deleteMovie = async(id)=>{
    await fetch(`${process.env.REACT_APP_URL}/movies/${id}.json` , {
      method : 'DELETE',
      headers : {
        "Content-Type" : "application/json"
      }
    });
    console.log("at deletemovie",id);
    const newMovies = movies.filter((item)=>item.id !== id);
    setMovies(newMovies);
  }
  const movieslist = [];
  const getMovies = useCallback(async() => {
    try {
    
      setIsLoading(true);
      setError(null);

     const response = await fetch(`${process.env.REACT_APP_URL}/movies.json`);

      console.log(response.ok);
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const data = await response.json();
      console.log(data)
        for(const key in data){
           movieslist.push({
            id : key,
            title : data[key].title,
            releaseDate : data[key].date,
            openingText : data[key].dsc
           })
        }
        // console.log("moivieslist",movieslist);
      const transformArray = movieslist.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          releaseDate: movie.releaseDate,
          openingText: movie.openingText,
        };
      });
      // console.log(transformArray);
      setMovies(transformArray);
    } catch (err) {

      // setRetring(true);
      setError(err.message);
  
    }
    setIsLoading(false);
  },[])
  useEffect(()=>{
     const fetchData = async()=>{
      await getMovies();
     }
     fetchData();
  },[getMovies]);
  
 

  // const stopRetring = () => {
    // setRetring(false);
    // clearInterval(timmer);
  // };
  // const onGetMovies = () => {
  //   let i =0;
  //   timmer = setInterval(async () => {
  //     console.log("interval is called")
  //     console.log(i);
  //     getMovies();
  //     i++;
  //   }, 4000);
  //   console.log("timer",timmer)
  // };

  return (
    <React.Fragment>
      <AddMovie/>
      <section>
        <button onClick={getMovies}>Fetch Movies</button>
      </section>
      <section>
        {/* {isLoading ? <h1>Loading...</h1> : <MoviesList movies={movies} />} */}
        {!isLoading && movies.length > 0 && <MoviesList deleteMovie={deleteMovie} movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Fount no Movie</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
      {/* {retring && (
        <div className="cancel">
          <button onClick={stopRetring}>Cancel</button>
        </div>
      )} */}
    </React.Fragment>
  );
}

export default App;
