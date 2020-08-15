import * as React from "react";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {Film} from "../../type";
const SmallMovieCardWrapper = withActiveItem(SmallMovieCard);


interface Props {
  films: Film[],
  onActiveFilm: () => void
}

class MovieList extends React.PureComponent<Props, {}> {
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

export default MovieList;
