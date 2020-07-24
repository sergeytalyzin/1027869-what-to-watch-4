import React from "react";
import {Switch, Route, Router} from "react-router-dom";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import MoviePage from "../movie-page/movie-page.jsx";
import withActiveTab from "../../hocs/with-tabs/with-tabs.js";
import {connect} from "react-redux";
import MovieVideoPlayer from "../movie-video-player/movie-video-player.jsx";
import withVideo from "../../hocs/with-video/with-video.js";
import {ActionCreator} from "../../reducer/app-status/app-status.js";
import {getFilmActive, getFilmToWatch} from "../../reducer/app-status/selectors.js";
import {getFilmsToRender, getAllFilms, getPromoFilm} from "../../reducer/data/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import history from "../../history.js";
import {AppRoute} from "../../const.js";
import MyList from "../my-list/my-list.jsx";
import PrivateRoute from "../private-route/private-route.jsx";

const VideoPlayer = withVideo(MovieVideoPlayer);


const MoviePageWrapper = withActiveTab(MoviePage);


const App = ({
  loadFilms,
  login,
  onFilmToWatchClick,
  films,
  onActiveFilmClick,
  authorizationStatus,
  comment,
  filmsToRender,
  film,
  postFavoriteFilms,
  loadFavoriteFilms,
}) => {
  console.log(`authorizationStatus`,authorizationStatus)
  return (<Router history={history}>
    <Switch>
      <Route exact path={AppRoute.ROOT}
        render={() =>
          <Main
            loadFavoriteFilms={loadFavoriteFilms}
            postFavoriteFilms={postFavoriteFilms}
            films={filmsToRender}
            loadFilms={loadFilms}
            promoFilm={film}
            onFilmWatch={onFilmToWatchClick}
            authorizationStatus={authorizationStatus}
          />
        }
      />
      <Route exact path={AppRoute.SIGN_IN}
        render={()=>
          <SignIn onSubmit={login}/>
        }
      />
      <Route exact path={`${AppRoute.MOVIE_PAGE}/:id`}
        render={(routeProps)=>{
          const id = parseInt(routeProps.match.params.id, 10);
          const chosenFilm = films.find((offer) => offer.id === id);
          return <MoviePageWrapper
            loadFilms={loadFilms}
            loadFavoriteFilms={loadFavoriteFilms}
            postFavoriteFilms={postFavoriteFilms}
            onFilmWatch={onFilmToWatchClick}
            film = {chosenFilm}
            films = {films}
            onActiveFilm={onActiveFilmClick}
            authorizationStatus={authorizationStatus}
          />;
        }}
      />

      <PrivateRoute exact path={`${AppRoute.FILMS}/:id${AppRoute.REVIEW}`}
        auth={authorizationStatus}
        render={(routeProps)=> {
          const id = parseInt(routeProps.match.params.id, 10);
          const chosenFilm = films.find((offer) => offer.id === id);
          return <AddReview
            activeFilm = {chosenFilm}
            onSubmit = {comment}
          />;
        }}
      />
      <PrivateRoute exact path={`${AppRoute.FILMS}/:id${AppRoute.PLAYER}`}
        auth={authorizationStatus}
        render={(routeProps)=> {
          const id = parseInt(routeProps.match.params.id, 10);
          const filmsToWatch = films.find((offer) => offer.id === id);
          return <VideoPlayer
            type={`movie`}
            className={`player__video`}
            isPlaying={false}
            videoSrc={filmsToWatch.videoLink}
            posterSrc={filmsToWatch.src}
            onExitFilmButtonClick = {onFilmToWatchClick}
            isMuted
          />;
        }
        }/>
      <PrivateRoute
        auth={authorizationStatus}
        path={AppRoute.MY_LIST} exact
        render={()=>
          <MyList/>
        }/>
    </Switch>
  </Router>);
};


App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    genre: PropTypes.string,
    date: PropTypes.number,
  })).isRequired,
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
    runTime: PropTypes.number,
    src: PropTypes.string,
    title: PropTypes.string,
    videoLink: PropTypes.string,
    actors: PropTypes.any,
  }),
  filmsToRender: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    genre: PropTypes.string,
    date: PropTypes.number,
  })).isRequired,
  onActiveFilmClick: PropTypes.func,
  onFilmToWatchClick: PropTypes.func,
  login: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  comment: PropTypes.func,
  postFavoriteFilms: PropTypes.func,
  loadFavoriteFilms: PropTypes.func,
  loadFilms: PropTypes.func,
};


const mapStateToProps = (state) => ({
  films: getAllFilms(state),
  film: getPromoFilm(state),
  filmsToRender: getFilmsToRender(state),
  activeFilm: getFilmActive(state),
  filmToWatch: getFilmToWatch(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapStateToDispatch = (dispatch) =>({
  onActiveFilmClick(film) {
    dispatch(ActionCreator.activeFilm(film));
  },
  onFilmToWatchClick: (film) => {
    dispatch(ActionCreator.setFilmToWatch(film));
  },
  login: (authData) => {
    dispatch(UserOperation.login(authData));
  },
  comment: (id, review) => {
    dispatch(DataOperation.postReview(id, review));
  },
  loadFavoriteFilms: () =>{
    dispatch(DataOperation.loadFavoriteFilms());
  },
  postFavoriteFilms: (id, status) => {
    dispatch(DataOperation.postFavoriteFilms(id, status));
  },
  loadFilms: ()=> {
    dispatch(DataOperation.loadFilms());
  }
});

export {App};

export default connect(mapStateToProps, mapStateToDispatch)(App);
