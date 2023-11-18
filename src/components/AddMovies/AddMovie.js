import React, { useState } from 'react'
import './AddMovie.css'

function AddMovie() {
  const [title , setTitle] = useState('')
  const [dsc , setDsc] = useState('')
  const [date , setDate] = useState('')
  const addMovie =async (e)=>{
    e.preventDefault();
    const movie = {
      title : title,
      dsc : dsc,
      date : date,
    }
    // console.log(title , dsc, date);
    try{

      const result = await fetch(`${process.env.REACT_APP_URL}//movies.json`,{
        method : "POST",
        body : JSON.stringify(movie),
        headers : {
          'Content-Type' : "application/json"
        }
      }); 
      const data = await result.json();
      console.log(data);
      setTitle('')
      setDsc('')
      setDate('')
    }catch(err){
      console.log(err);
    }

    
  }
  return (
    <div className='fromContainer'>
      <form onSubmit={addMovie}>
        <label htmlFor="title"> Title</label>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} id='title' required />
        
        <label htmlFor="dsc">Opening Date</label>
        <textarea minLength="10" maxLength="100" value={dsc} onChange={(e)=>setDsc(e.target.value)} id='dsc' required />

        <label htmlFor="date">Release Date</label>
        <input type="date" className='date' value={date} onChange={(e)=>setDate(e.target.value)} id='date' required />
        <button >Add Movie</button>

      </form>
    </div>
  )
}

export default AddMovie;
