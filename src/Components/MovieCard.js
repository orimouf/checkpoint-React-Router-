import React from "react";
import StarRatingComponent from 'react-star-rating-component';
import './movieCard.css'

const MovieCard = (props) => {

    return (
        <div className="movie-card">
            <div style={{fontSize: "xx-large"}}>
                <StarRatingComponent name="rate" editing={false}
                    starCount={5} value={props.rating} emptyStarColor={"white"}/>
            </div>
            <div className="poster">
                <img src={props.poster} alt="" />
            </div>
            <div className="title">
                <h1>{props.title}</h1>
            </div>
        </div>
    )
}
export default MovieCard;
