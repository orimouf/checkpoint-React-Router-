import React, { useState, useEffect } from "react";
import './App.css';
import MovieCard from './Components/MovieCard'
import AddMovie from './Components/AddMovie'
import Search from './Components/Search'

const Data = [{
  "title": "V for Vandetta",
  "poster": "http://i.ebayimg.com/00/s/NTAwWDMzMw==/z/VIsAAOxyaTxTWIqs/$_3.JPG?set_id=2",
  "rating": 5
},
{
  "title": "The Detachement",
  "poster": "https://www.joblo.com/assets/images/oldsite/posters/images/full/detachment-french-poster.jpg",
  "rating": 4
},
{
  "title": "The experiment",
  "poster": "https://images-na.ssl-images-amazon.com/images/I/51UFOnvEviL.jpg",
  "rating": 5
},
{
  "title": "Inception",
  "poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
  "rating": 4
}
];

function App() {

  let errorMsg = '';
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState(0);
  const [addMovie, setAddMovie] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [buttonAdd, setButtonAdd] = useState(false);

  useEffect(() => {
    setFilteredMovies(
      Data.filter((ele) =>
        ele.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  },[search]);

  const handleAdd = () => {
    setAddMovie(!addMovie)
  }

  useEffect( function addNewMovie() {
    let checkRating = (rating < 1 || rating > 5) ? false : true;
    let checkPoster = (poster === "") ? false : true;
    let checkTitle = (title === "") ? false : true;

    if(checkRating && checkPoster && checkTitle) {
      let newMovie = {
        "title": title,
        "poster": poster,
        "rating": rating
      };
      Data.push(newMovie)
      handleAdd()
    } else {
      errorMsg = (!checkRating) ? 'Enter a number between (1-5)' : 
                 (!checkPoster) ? 'Enter the link of the poster' :
                 (!checkTitle) ? 'Enter the title of the movie' : ''
                 console.log(errorMsg);
    }
  });
  // const addNewMovie = () => {
  //   let checkRating = (rating < 1 || rating > 5) ? false : true;
  //   let checkPoster = (poster === "") ? false : true;
  //   let checkTitle = (title === "") ? false : true;

  //   if(checkRating && checkPoster && checkTitle) {
  //     let newMovie = {
  //       "title": title,
  //       "poster": poster,
  //       "rating": rating
  //     };
  //     Data.push(newMovie)
  //     handleAdd()
  //   } else {
  //     errorMsg = (!checkRating) ? 'Enter a number between (1-5)' : 
  //                (!checkPoster) ? 'Enter the link of the poster' :
  //                (!checkTitle) ? 'Enter the title of the movie' : ''
  //                console.log(errorMsg);
  //   }
  // }

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
            placeholder="Enter the title of the movie" onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" className="add-poster" 
            placeholder="Enter the link of the poster" onChange={(e) => setPoster(e.target.value)}/>
            <input type="number" max="5" min="1" className="add-rating"
            placeholder="Enter the rating from 1 to 5" onChange={(e) => setRating(e.target.value)}/>
            <div>
              <button onClick={setButtonAdd}>Add</button>
              <button onClick={handleAdd}>Cancel</button>
            </div>
            {
              (errorMsg !== '') ? <span className="error-show">{errorMsg}</span> : ''
            }
            
          </div>
        </div>
      }
      
    </div>
  );
}

export default App;
