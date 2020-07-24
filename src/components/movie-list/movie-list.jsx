import React, {PureComponent} from "react";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import PropTypes from "prop-types";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
const SmallMovieCardWrapper = withActiveItem(SmallMovieCard);


class MovieList extends PureComponent {
  constructor(props) {
    super(props);
  }
  getFilms() {
    const films = this.props.films;
    return films.map((it)=>{
      return (
        <SmallMovieCardWrapper
          onActiveFilm = {this.props.onActiveFilm}
          film = {it}
          key = {it.id}
          active={{}}
        />
      );
    });
  }

  render() {
    return this.getFilms();
  }
}

MovieList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    genre: PropTypes.string,
    date: PropTypes.number,
  })).isRequired,
  onActiveFilm: PropTypes.func,
};
export default MovieList;
