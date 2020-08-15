import * as React from "react";
import {getTextRating} from "../../utils";
import {Film} from "../../type";

interface Props {
  film: Film
}


const MoviePageOverview: React.FunctionComponent<Props> = (props: Props) => {

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

export default MoviePageOverview;
