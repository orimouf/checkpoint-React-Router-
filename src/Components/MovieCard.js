import React from "react";
import StarRatingComponent from 'react-star-rating-component';
import './movieCard.css'

const MovieCard = (props) => {

    return (
        <div className="movie-card">
            <div className="poster grid">
                <div className="rating-box">
                    <StarRatingComponent name="rate" editing={false}
                        starCount={5} value={props.rating} emptyStarColor={"#a07100"} starColor={"#424040f2"}/>
                </div>
                <img src={props.poster} alt="" />
            </div>
            <div className="title">
                <h1>{props.title}</h1>
            </div>
        </div>
    )
}
export default MovieCard;
