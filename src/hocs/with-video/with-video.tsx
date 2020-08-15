import * as React from "react";

import {TypeMovie} from "../../const";
import {Subtract} from "utility-types";

interface Props {
  isPlaying: boolean,
  type: string,
  className: string,
  videoSrc: string,
  posterSrc: string,
  onExitFilmButtonClick: ()=> void,
  isMuted: any
}
interface InjectedProps {
  onFullScreenButtonClick: ()=> void,
  onPlayButtonClick: ()=> void
  isPlaying: boolean
  isFullScreen: boolean
  progressInSeconds: number
  progressInPercent: number
}

interface State {
  isPlaying: boolean,
  isFullScreen?: boolean,
  progressInPercent: number,
  progressInSeconds: number
}

const withVideo = (Component) => {

  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithVideo extends React.PureComponent<T, State> {
    private videoRef: React.RefObject<HTMLVideoElement>



    constructor(props) {
      super(props);

      this.videoRef = React.createRef();
      this.state = {
        isPlaying: this.props.isPlaying,
        isFullScreen: false,
        progressInPercent: 0,
        progressInSeconds: 0,
      };

      this._handlerPlayButtonClick = this._handlerPlayButtonClick.bind(this);
      this._handlerFullScreenButtonClick = this._handlerFullScreenButtonClick.bind(this);
    }

    componentDidMount() {
      const {videoSrc, isMuted = false, type} = this.props;
      const video = this.videoRef.current;
      video.src = videoSrc;
      video.muted = isMuted;

      video.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      if (type === TypeMovie.MOVIE) {
        video.onpause = () => {
          this.setState({
            isPlaying: false
          });
        };
      }
      video.ontimeupdate = () => this.setState({
        progressInSeconds: Math.floor(video.duration - video.currentTime),
        progressInPercent: video.duration ? Math.round((video.currentTime / video.duration) * 100) : 0
      });

      if (this.state.isPlaying) {
        video.play();
      }
    }

    componentDidUpdate() {
      const video = this.videoRef.current;

      const {isPlaying, type} = this.props;

      if (type === TypeMovie.MOVIE) {
        if (this.state.isPlaying) {
          video.play();
        } else {
          video.pause();
        }
      }

      if (type === TypeMovie.TRAILER && isPlaying !== this.state.isPlaying) {
        this.setState({isPlaying}, ()=> {
          if (isPlaying) {
            video.play();
          } else {
            video.load();
          }
        });
      }
    }

    componentWillUnmount() {
      const video = this.videoRef.current;

      video.onplay = null;
      video.src = ``;
      video.muted = false;
      video.onpause = null;
      video.ontimeupdate = null;
    }

    _handlerPlayButtonClick() {
      this.setState((prevState)=>{
        return {
          isPlaying: !prevState.isPlaying,
        };
      });
    }

    _handlerFullScreenButtonClick() {
      this.setState((prevState) => ({
        isFullScreen: !prevState.isFullScreen
      }));
    }

    render() {
      const {posterSrc, videoSrc, widthAtr = null, heightAtr = null, className = ``} = this.props;
      const {isPlaying, isFullScreen, progressInSeconds, progressInPercent} = this.state;
      return <Component
        {...this.props}
        onFullScreenButtonClick={this._handlerFullScreenButtonClick}
        onPlayButtonClick={this._handlerPlayButtonClick}
        isPlaying={isPlaying}
        isFullScreen={isFullScreen}
        progressInSeconds={progressInSeconds}
        progressInPercent={progressInPercent}
      >
        <video src={videoSrc} className={className} ref={this.videoRef} poster={posterSrc}  width={widthAtr} height={heightAtr}/>
      </Component>;
    }
  }


  return WithVideo;
};

export default withVideo;
