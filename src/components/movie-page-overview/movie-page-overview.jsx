import React from "react";
import PropTypes from "prop-types";
import {getTextRating} from "../../utils.js";

const MoviePageOverview = (props) => {

  const {rating, ratingCount, ratingLevel, description, actors, director} = props.film;
  return (<React.Fragment>
    <div className="movie-rating">
      <div className="movie-rating__score">{rating}</div>
      <p className="movie-rating__meta">
        <span className="movie-rating__level">{getTextRating(ratingLevel)}</span>
        <span className="movie-rating__count">{ratingCount}</span>
      </p>
    </div>

    <div className="movie-card__text">
      {description}

      <p className="movie-card__director"><strong>Director: {director}</strong></p>

      <p className="movie-card__starring"><strong>Starring: {actors}</strong></p>
    </div>
  </React.Fragment>);
};


MoviePageOverview.propTypes = {
  film: PropTypes.shape({
    bg: PropTypes.string,
    bgSrc: PropTypes.string,
    date: PropTypes.number,
    description: PropTypes.string,
    director: PropTypes.string,
    genre: PropTypes.string,
    id: PropTypes.number,
    isFavorite: PropTypes.boolean,
    posterBig: PropTypes.string,
    previewVideoLink: PropTypes.string,
    rating: PropTypes.number,
    ratingCount: PropTypes.number,
    ratingLevel: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    runTime: PropTypes.string,
    src: PropTypes.string,
    title: PropTypes.string,
    videoLink: PropTypes.string,
    actors: PropTypes.any,
  })

};


export default MoviePageOverview;
