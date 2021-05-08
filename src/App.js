import React, { useRef, useState, useEffect } from "react";
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Search from './Components/Search'
import Home from './Components/Pages/Home'
import Movies from './Components/Pages/Movies'
import 'semantic-ui-css/semantic.min.css'
import Data from './assets/Data'
import Footer from './Components/Footer'

function App() {

  let errorStyle = 'background: #ff000021;box-shadow: 0 0 4px #f44336;';
  const titleRef = useRef("");
  const posterRef = useRef("");
  const trailerRef = useRef("");
  const descriptionRef = useRef("");
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
      const trailerElement = trailerRef.current.value;
      const descriptionElement = descriptionRef.current.value;
      const ratingElement = parseInt(ratingRef.current.value);
      
      if(titleElement !== '' && posterElement !== '' && ratingElement !== ''&& descriptionElement !== '' && trailerElement !== '') {
        if(ratingElement < 1 || ratingElement > 5){
          ratingRef.current.style = errorStyle;
          statusRef.current.innerHTML = 'Enter a number between (1-5)';
          statusRef.current.className = 'errorMsg';
        } else {
          let newMovie = {
            "id": (Data.length+1).toString(),
            "title": titleElement,
            "poster": posterElement,
            "trailer": trailerElement,
            "rating": ratingElement,
            "description": descriptionElement
          };
          Data.push(newMovie);
          handleAdd();
          resetAdd();
        }
      } else {
        // error handling
        titleRef.current.style = '';
        posterRef.current.style = '';
        trailerRef.current.style = '';
        descriptionRef.current.style = 'height:130px;';
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
          if(ratingElement === '' || isNaN){
            ratingRef.current.style = errorStyle;
            statusRef.current.innerHTML = 'Enter the title of the movie';
            statusRef.current.className = 'errorMsg';
          }
          if(trailerElement === ''){
            trailerRef.current.style = errorStyle;
            statusRef.current.innerHTML = 'Enter the link of the trailer';
            statusRef.current.className = 'errorMsg';
          }
          if(descriptionElement === ''){
            descriptionRef.current.style = errorStyle + "height:130px;";
            statusRef.current.innerHTML = 'Enter the Description';
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
        <Switch>
          <Route exact path="/">
            <Home search={search} filteredMovies={filteredMovies} handleAdd={handleAdd} path="/"/> 
          </Route>
          <Route path="/Movies/:id" component={Movies}/>         
        </Switch>
        :
        <div className="main">
          <div className="grid-2 border-add">
            <h1>Add new movie</h1>
            <input type="text" className="add-title" 
            placeholder="Enter the title of the movie" ref={titleRef} />
            <input type="text" className="add-poster" 
            placeholder="Enter the link of the poster" ref={posterRef} />
            <input type="text" className="add-trailer" 
            placeholder="Enter the link of the trailer" ref={trailerRef} />
            <input type="number" max="5" min="1" className="add-rating"
            placeholder="Enter the rating from 1 to 5" ref={ratingRef} />
            <textarea className="add-description" style={{height:"130px"}}
            placeholder="Enter the Description" ref={descriptionRef} ></textarea>
            <span ref={statusRef} ></span>
            <div>
              <button onClick={setButtonAdd}>Add</button>
              <button onClick={handleAdd}>Cancel</button>
            </div>
          </div>
        </div>
      }
      <Footer />
      
    </div>
  );
}

export default App;
