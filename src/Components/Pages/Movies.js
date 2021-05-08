import React from "react";
import StarRatingComponent from 'react-star-rating-component';
import Data from '../../assets/Data'
import '../movieCard.css'
import { Button } from 'semantic-ui-react'

const Movies = (props) => {
    const movie = Data.find((e) => (e.id === props.match.params.id))

    return (
        <div className="main grid-3">
            <div className="go-back">
                <Button icon='arrow alternate circle left' content='Back'  onClick={props.history.goBack} />
            </div>
            <div className="poster-descp">
                <img src={movie.poster} alt="" />
            </div>
            <div className="description">
                <h2>{movie.title}</h2>
                <h3>Rating : </h3>
                <h4><StarRatingComponent name="rate" editing={false}
                    starCount={5} value={movie.rating} emptyStarColor={"white"}/></h4>
                <h3>Description : </h3>
                <h4>{movie.description}</h4>
            </div>
            <div className="video-descp">
                <iframe width="100%" height="100%" src={movie.trailer} 
                title="YouTube video player" frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; gyroscope;"></iframe>
            </div>
        </div>
    )
}
export default Movies;
