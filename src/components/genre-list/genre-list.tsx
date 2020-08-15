import * as React from "react";
import {genreType} from "../../const";
import {Film} from "../../type";

interface Props {
  active: number,
  handleClickItem: (i:number) => void,
  onChangeGenre: () => void,
  onGenreClick: (it:any) => void,
  allListFilms: Film[]
}


const GenreList: React.FC<Props> = (props: Props) => {
  const {allListFilms, onChangeGenre, active, handleClickItem, onGenreClick} = props;

  let mySet = new Set();
  mySet.add(genreType.ALL);
  allListFilms.forEach((it) => mySet.add(it.genre));
  const genreListAll = Array.from(mySet);

  return (
    <ul className="catalog__genres-list">
      {genreListAll.map((it, i) => {
        return (<li key={i}
          onClick={(evt)=>{
            evt.preventDefault();
            onGenreClick(it);
            handleClickItem(i);
            onChangeGenre();
          }}

          className={`catalog__genres-item ${ active === i && `catalog__genres-item--active`}`}>
          <a href="#" className="catalog__genres-link">{it}</a>
        </li>);
      })
      }
    </ul>
  );
};


export default GenreList;

