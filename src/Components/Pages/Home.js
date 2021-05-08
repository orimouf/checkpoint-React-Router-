import React from "react";
import { Link } from 'react-router-dom';
import MovieCard from '../MovieCard'
import Data from '../../assets/Data'
import '../movieCard.css'

const Home = (props) =>  {
      
    return (
        <div className="main grid-1">
          {(props.search !== "") ?
            props.filteredMovies.map((ele) => (
              <Link key={ele.id} to={`/Movies/${ele.id}`}>
                <MovieCard title={ele.title} poster={ele.poster} rating={ele.rating} />
              </Link>
              ))
              :
            Data.map((ele) => (
              <Link key={ele.id+1000} to={`/Movies/${ele.id}`}>
                <MovieCard title={ele.title} poster={ele.poster} rating={ele.rating} />
              </Link>
              ))
            }
          <div className="movie-card add-movie">
            <button className="add-button" onClick={props.handleAdd}>+</button>
          </div>
        </div>
    )
}
export default Home;
