import * as React from "react";
import MovieList from "../movie-list/movie-list";
import GenreList from "../genre-list/genre-list";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app-status/app-status";
import ShowMore from "../show-more/show-more";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {getAllFilms, getFilmsToRender} from "../../reducer/data/selectors";
import {getFilmsToShowCount} from "../../reducer/app-status/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Link} from "react-router-dom";
import history from "../../history";
import {AppRoute} from "../../const";
import {Operation as DataOperation} from "../../reducer/data/data";
import {Film} from "../../type";

const GenreListWrapper = withActiveItem(GenreList);

interface Props {
  authorizationStatus: string
  showedFilmsAmount: number,
  filmsLength: number,
  onChangeGenre: ()=> void,
  onGenreClick: ()=> void,
  films: Film[],
  allListFilms: Film[],
  promoFilm: Film,
  onClickShowMore:()=> void,
  onClickActiveFilm:()=> void,
  onFilmWatch: (film:Film)=> void,
  postFavoriteFilms: (number, par)=> void,
  loadFavoriteFilms: ()=> void,
  loadFilms: ()=> void,
  loadPromoFilm: ()=> void
}

const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {films, allListFilms, promoFilm, onGenreClick, onChangeGenre,
    showedFilmsAmount, onClickShowMore, onClickActiveFilm,
    authorizationStatus, onFilmWatch, filmsLength, postFavoriteFilms, loadFavoriteFilms, loadFilms, loadPromoFilm} = props;
  const {title, genre, date, bgSrc, src, isFavorite, id} = promoFilm;

  const changeFavorite = () => {
    if (isFavorite) {
      postFavoriteFilms(id, 0);
    } else {
      postFavoriteFilms(id, 1);
    }
    loadFavoriteFilms();
    loadFilms();
    loadPromoFilm();
  };


  return (<React.Fragment>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={bgSrc} alt={title}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a onClick={(e)=>{
            e.preventDefault();
            history.push(AppRoute.ROOT);
          }}
          className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="user-block">
          {authorizationStatus === AuthorizationStatus.AUTH ? (
            <div onClick={()=>{
              history.push(AppRoute.MY_LIST);
            }} className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          ) :
            (
              <Link
                to={AppRoute.SIGN_IN}
                href="#" className="user-block__link">Sign in</Link>
            )}
        </div>
      </header>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={src} alt={title} width="218"
              height="327"/>
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{date}</span>
            </p>

            <div className="movie-card__buttons">
              <button
                onClick={()=>{
                  onFilmWatch(films[0]);
                  history.push(`${AppRoute.FILMS}/${id}${AppRoute.PLAYER}`);
                }}
                className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"/>
                </svg>
                <span>Play</span>
              </button>
              <button onClick={() => {
                changeFavorite();
              }
              }
              className="btn btn--list movie-card__button movie-card__button--favorite" type="button">
                {isFavorite ?

                  <>
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#remove"/>
                    </svg>
                    <span>Remove from list</span>
                  </>
                  :
                  <>
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"/>
                    </svg>
                    <span>My list</span>
                  </>

                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenreListWrapper
          onChangeGenre={onChangeGenre}
          onGenreClick={onGenreClick}
          allListFilms={allListFilms}
          active={0}
        />

        <div className="catalog__movies-list">
          <MovieList
            onActiveFilm = {onClickActiveFilm}
            films = {films}
          />
        </div>

        {(filmsLength >= showedFilmsAmount) &&
          <ShowMore onButtonClick={onClickShowMore}/>}
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>
  );
};



const mapStateToProps = (state) => ({
  allListFilms: getAllFilms(state),
  filmsLength: getFilmsToRender(state).length,
  showedFilmsAmount: getFilmsToShowCount(state),
});

const mapStateToDispatch = (dispatch) =>({
  onGenreClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
  onClickShowMore() {
    dispatch(ActionCreator.incrementShowed());
  },
  onChangeGenre() {
    dispatch(ActionCreator.resetShowed());
  },
  onClickActiveFilm(film) {
    dispatch(ActionCreator.activeFilm(film));
  },
  loadPromoFilm: () => {
    dispatch(DataOperation.promoFilm());
  }
});


export {Main};

export default connect(mapStateToProps, mapStateToDispatch)(Main);
