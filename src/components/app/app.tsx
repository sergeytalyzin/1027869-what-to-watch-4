import * as React from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import Main from "../main/main";
import MoviePage from "../movie-page/movie-page";
import withActiveTab from "../../hocs/with-tabs/with-tabs";
import {connect} from "react-redux";
import MovieVideoPlayer from "../movie-video-player/movie-video-player";
import withVideo from "../../hocs/with-video/with-video";
import {ActionCreator} from "../../reducer/app-status/app-status";
import {getFilmActive, getFilmToWatch} from "../../reducer/app-status/selectors";
import {getFilmsToRender, getAllFilms, getPromoFilm} from "../../reducer/data/selectors";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as DataOperation} from "../../reducer/data/data";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import SignIn from "../sign-in/sign-in";
import AddReview from "../add-review/add-review";
import history from "../../history";
import {AppRoute} from "../../const";
import MyList from "../my-list/my-list";
import PrivateRoute from "../private-route/private-route";
import {Film} from "../../type";

const VideoPlayer = withVideo(MovieVideoPlayer);


const MoviePageWrapper = withActiveTab(MoviePage);



interface Props {
    loadFilms: () => void,
    login: () => void,
    onFilmToWatchClick: () => void,
    films: Film[],
    onActiveFilmClick:() => void,
    authorizationStatus: string,
    comment: () => void,
    filmsToRender: Film[],
    film: Film,
    postFavoriteFilms:() => void,
    loadFavoriteFilms:() => void,
}


const App : React.FC<Props> = ({
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
      <Redirect to={AppRoute.ROOT}/>
    </Switch>
  </Router>);
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
  onActiveFilmClick: (film) => {
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
