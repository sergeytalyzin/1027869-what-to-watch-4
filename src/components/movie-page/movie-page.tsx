import * as React from "react";
import MoviePageOverview from "../movie-page-overview/movie-page-overview";
import MoviePageReviews from "../movie-page-reviews/movie-page-reviews";
import MoviePageDetails from "../movie-page-details/movie-page-details";
import MovieList from "../movie-list/movie-list";
import Tabs from "../tabs/tabs";
import {AuthorizationStatus} from "../../reducer/user/user";
import history from "../../history";
import {AppRoute, HowMuchRenderLikeThisFilms} from "../../const";
import {Film} from "../../type";


const TABS = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

const activeToTab = (tab, film, id) => {
  switch (tab) {
    case TABS.REVIEWS :
      return <MoviePageReviews filmId = {id} film={film}/>;
    case TABS.DETAILS :
      return <MoviePageDetails film={film}/>;
    default :
      return <MoviePageOverview film={film}/>;
  }
};

interface Props {
  onActiveFilm: () => void,
  onFilmWatch: (film:Film) => void,
  handleTabClick: () => void,
  films: Film[]
  film: Film
  activeTab: string,
  authorizationStatus: string,
  postFavoriteFilms: (id:number,status:number) => void,
  loadFavoriteFilms: () => void,
  loadFilms: () => void,
}


const MoviePage: React.FunctionComponent<Props> = (props:Props) => {
  const {authorizationStatus, films, film, activeTab, handleTabClick, onFilmWatch, onActiveFilm, postFavoriteFilms, loadFavoriteFilms, loadFilms} = props;
  const {title, genre, date, src, bg, bgSrc, id, isFavorite} = film;
  let moreLikeThisFilms = [];
  moreLikeThisFilms = films.filter((it)=> it.genre === genre && it.id !== id).slice(HowMuchRenderLikeThisFilms.START, HowMuchRenderLikeThisFilms.END);

  const changeFavorite = () => {
    if (isFavorite) {
      postFavoriteFilms(id, 0);
    } else {
      postFavoriteFilms(id, 1);
    }
    loadFavoriteFilms();
    loadFilms();
  };

  return (<React.Fragment>
    <section className="movie-card movie-card--full" style={{backgroundColor: `${bg}`}}>
      <div className="movie-card__hero">
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
            href="#" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div onClick={()=>{
              history.push(AppRoute.MY_LIST);
            }} className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{date}</span>
            </p>

            <div className="movie-card__buttons">
              <button onClick={()=>{
                onFilmWatch(film);
                history.push(`${AppRoute.FILMS}/${id}${AppRoute.PLAYER}`);
              }} className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"/>
                </svg>
                <span>Play</span>
              </button>
              <button
                onClick={changeFavorite}
                className="btn btn--list movie-card__button" type="button">

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
              {authorizationStatus === AuthorizationStatus.AUTH &&
              (<button onClick={(e) => {
                history.push(`${AppRoute.FILMS}/${id}${AppRoute.REVIEW}`);
                e.preventDefault();
              }}

              className="btn movie-card__button">Add review</button>)}
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={src} alt={`${title} poster`} width="218"
              height="327"/>
          </div>

          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              {<Tabs activeTab={activeTab} handleTabClick={handleTabClick}/>}
            </nav>
            {activeToTab(activeTab, film, id)}
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>
        <div className="catalog__movies-list">
          {<MovieList films={moreLikeThisFilms} onActiveFilm={onActiveFilm}/>}
        </div>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="#" onClick={(e)=>{
            e.preventDefault();
            history.push(AppRoute.ROOT);
          }}
          className="logo__link logo__link--light">
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
  </React.Fragment>);
};



export default MoviePage;
