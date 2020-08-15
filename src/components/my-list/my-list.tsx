import * as React from "react";
import {connect} from "react-redux";
import {getFavoriteList} from "../../reducer/data/selectors";
import {ActionCreator} from "../../reducer/app-status/app-status";
import MovieList from "../movie-list/movie-list";
import history from "../../history";
import {AppRoute} from "../../const";
import {Film} from "../../type";


interface Props {
  onActiveFilm: () => void,
  favoriteFilmsList: Film[] | []
}

const MyList: React.FunctionComponent<Props> = ({favoriteFilmsList, onActiveFilm}: Props) => {

  return (<div className="user-page">
    <header className="page-header user-page__head">
      <div className="logo">
        <a href="#" onClick={(e)=>{
          e.preventDefault();
          history.push(AppRoute.ROOT);
        }} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <h1 className="page-title user-page__title">My list</h1>

      <div className="user-block">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
        </div>
      </div>
    </header>

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <div className="catalog__movies-list">
        {
          <MovieList films={favoriteFilmsList} onActiveFilm={onActiveFilm}/>
        }
      </div>
    </section>

    <footer className="page-footer">
      <div className="logo">
        <a href="#" onClick={(e)=>{
          e.preventDefault();
          history.push(AppRoute.ROOT);
        }} className="logo__link logo__link--light">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  </div>);
};





const mapStateToProps = (state) => ({
  favoriteFilmsList: getFavoriteList(state),
});

const mapStateToDispatch = (dispatch) => ({
  onActiveFilm(film) {
    dispatch(ActionCreator.activeFilm(film));
  }
});


export {MyList};

export default connect(mapStateToProps, mapStateToDispatch)(MyList);
