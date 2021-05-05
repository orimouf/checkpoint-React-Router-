import React, { useRef, useState, useEffect } from "react";
import './App.css';
import MovieCard from './Components/MovieCard'
import Search from './Components/Search'

const Data = [
  {
    "title": "V for Vandetta",
    "poster": "http://i.ebayimg.com/00/s/NTAwWDMzMw==/z/VIsAAOxyaTxTWIqs/$_3.JPG?set_id=2",
    "rating": 5,
    "description": "In a futuristic, totalitarian Britain, a freedom fighter known simply as V, uses terrorist tactics to fight the oppressive society. Evey aids him in his mission to bring down the government."
  },
  {
    "title": "The Detachement",
    "poster": "https://www.joblo.com/assets/images/oldsite/posters/images/full/detachment-french-poster.jpg",
    "rating": 4,
    "description": "Henry Barthes (Adrien Brody) is a substitute teacher who shuns emotional connections, and never stays long enough in one district to bond with his students or colleagues. "
  },
  {
    "title": "The experiment",
    "poster": "https://images-na.ssl-images-amazon.com/images/I/51UFOnvEviL.jpg",
    "rating": 5,
    "description": "Twenty-six subjects are chosen to participate in a psychological experiment. While one group plays the role of prison guards, the others play inmates. Can the guards maintain order when mutiny erupts?"
  },
  {
    "title": "Inception",
    "poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
    "rating": 4,
    "description": "Initiation or Transplant is a 2010 science fiction movie written, directed and produced by Christopher Nolan. The film stars Leonardo DiCaprio, Ken Watanabe, Joseph Gordon-Levitt, Marion Cotillard, Ellen Page, Cillian Murphy, Tom Hardy, Delibi Rao, Tom Bringer and Michael Kane."
  }
];

function App() {

  let errorStyle = 'background: #ff000021;box-shadow: 0 0 4px #f44336;';
  const titleRef = useRef("");
  const posterRef = useRef("");
  const ratingRef = useRef(0);
  const statusRef = useRef("");
  const [addMovie, setAddMovie] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [buttonAdd, setButtonAdd] = useState(false);

  useEffect(() => {
    setFilteredMovies(
      Data.filter((ele) => {
        return (Number.isNaN(parseInt(search))) ?
          ele.title.toLowerCase().includes(search.toLowerCase()) :
          ele.rating === parseInt(search)
      })
    );
  },[search]);

  const handleAdd = () => {
    setAddMovie(!addMovie)
  }
  const resetAdd = () => {
    setButtonAdd(!buttonAdd)
  }

  useEffect( function addNewMovie() {
    if(addMovie) {
      const titleElement = titleRef.current.value;
      const posterElement = posterRef.current.value;
      const ratingElement = ratingRef.current.value;
      
      if(titleElement !== '' && posterElement !== '' && ratingElement !== '') {
        if(ratingElement < 1 || ratingElement > 5){
          ratingRef.current.style = errorStyle;
          statusRef.current.innerHTML = 'Enter a number between (1-5)';
          statusRef.current.className = 'errorMsg';
        } else {
          let newMovie = {
            "title": titleElement,
            "poster": posterElement,
            "rating": ratingElement
          };
          Data.push(newMovie);
          handleAdd();
          resetAdd();
        }
      } else {
        // error handling
        titleRef.current.style = '';
        posterRef.current.style = '';
        ratingRef.current.style = '';
        if(buttonAdd !== false){
          if(titleElement === ''){
            titleRef.current.style = errorStyle;
            statusRef.current.innerHTML = 'Enter a number between (1-5)';
            statusRef.current.className = 'errorMsg';
          }
          if(posterElement === ''){
            posterRef.current.style = errorStyle;
            statusRef.current.innerHTML = 'Enter the link of the poster';
            statusRef.current.className = 'errorMsg';
          }
          if(ratingElement === ''){
            ratingRef.current.style = errorStyle;
            statusRef.current.innerHTML = 'Enter the title of the movie';
            statusRef.current.className = 'errorMsg';
          }
        }
      }
    }
  });

  return (
    <div className="App">
      <header>
        <Search onChange={(e) => setSearch(e.target.value)} />
      </header>
      {(!addMovie) ?
        <div className="main grid-1">
          {(search !== "") ?
            filteredMovies.map((ele) => (
              <MovieCard title={ele.title} poster={ele.poster} rating={ele.rating} />))
              :
            Data.map((ele) => (
              <MovieCard title={ele.title} poster={ele.poster} rating={ele.rating} />))
          }
          <div className="movie-card add-movie">
            <button className="add-button" onClick={handleAdd}>+</button>
          </div>
        </div> :
        <div className="main">
          <div className="grid-2 border-add">
            <h1>Add new movie</h1>
            <input type="text" className="add-title" 
            placeholder="Enter the title of the movie" ref={titleRef} />
            <input type="text" className="add-poster" 
            placeholder="Enter the link of the poster" ref={posterRef} />
            <input type="number" max="5" min="1" className="add-rating"
            placeholder="Enter the rating from 1 to 5" ref={ratingRef} />
            <span ref={statusRef} ></span>
            <div>
              <button onClick={setButtonAdd}>Add</button>
              <button onClick={handleAdd}>Cancel</button>
            </div>
          </div>
        </div>
      }
      
    </div>
  );
}

export default App;
