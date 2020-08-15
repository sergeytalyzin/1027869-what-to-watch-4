import * as React from "react";

import MovieVideoPlayer from "../movie-video-player/movie-video-player";
import withVideo from "../../hocs/with-video/with-video";
import history from "../../history";
import {AppRoute} from "../../const";
import {Film} from "../../type";

const VideoPlayer = withVideo(MovieVideoPlayer);
let timer;


interface Props {
  onActiveFilm: (film:Film) => void,
  film: Film,
  active: (fil:Film) => void,
  handleClickItem: ({}:any)=> void,
}

const SmallMovieCard: React.FunctionComponent<Props> = (props: Props) => {
  const {onActiveFilm, film, active, handleClickItem} = props;
  const {posterBig, previewVideoLink, title, id} = film;

  // @ts-ignore
  // @ts-ignore
  return (
    <article
      onClick = {(e)=>{
        e.preventDefault();
        clearTimeout(timer);
        onActiveFilm(film);
        history.push(`${AppRoute.MOVIE_PAGE}/${id}`);
      }}
      onMouseEnter={()=>{
        timer = setTimeout(()=>{
          handleClickItem(film);
        }, 1000);
      }}
      onMouseLeave={()=>{
        clearTimeout(timer);
        handleClickItem({});
      }}
      className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <VideoPlayer
          isPlaying={active === film}
          videoSrc={previewVideoLink}
          posterSrc={posterBig}
          widthAtr={280}
          heightAtr={175}
          isMuted
          className={`player__trailer`}
          type={`trailer`}
          onExitFilmButtonClick = {null}
        />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="#">{title}</a>
      </h3>
    </article>
  );
};

export default SmallMovieCard;




