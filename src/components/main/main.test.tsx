import * as React from "react";
import * as renderer from "react-test-renderer";
import {Main} from "./main";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Film} from "../../type";

const data: Film[] = [
  {
    id: 1,
    title: `Mindhunter`,
    src: `somePath`,
    genre: `Comedy`,
    date: 1812,
    posterBig: `img/mindhunter.jpg`,
    rating: 3,
    ratingLevel: `Very good`,
    ratingCount: 111,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    actors: `Frank Sinatra, John Mason, Anthony Mann, Bred Pitt, Heinz Herald`,
    director: `Frank Sinatra`,
    previewVideoLink: `somePath`,
    runTime: 300,
  },
  {
    id: 2,
    title: `Mindhunter`,
    src: `somePath`,
    genre: `Comedy`,
    date: 1812,
    posterBig: `img/mindhunter.jpg`,
    rating: 3,
    ratingLevel: `Very good`,
    ratingCount: 111,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    actors: `Frank Sinatra, John Mason, Anthony Mann, Bred Pitt, Heinz Herald`,
    director: `Frank Sinatra`,
    previewVideoLink: `somePath`,
    runTime: 300,
  },
  {
    id: 3,
    title: `Mindhunter`,
    src: `somePath`,
    genre: `Comedy`,
    date: 1812,
    posterBig: `img/mindhunter.jpg`,
    rating: 3,
    ratingLevel: `Very good`,
    ratingCount: 111,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    actors: `Frank Sinatra, John Mason, Anthony Mann, Bred Pitt, Heinz Herald`,
    director: `Frank Sinatra`,
    previewVideoLink: `somePath`,
    runTime: 300,
  },
  {
    id: 4,
    title: `Mindhunter`,
    src: `somePath`,
    genre: `Comedy`,
    date: 1812,
    posterBig: `img/mindhunter.jpg`,
    rating: 6,
    ratingLevel: `Very good`,
    ratingCount: 233,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    actors: `Frank Sinatra, John Mason, Anthony Mann, Bred Pitt, Heinz Herald`,
    director: `John Mason`,
    previewVideoLink: `somePath`,
    runTime: 300,
  },
  {
    id: 5,
    title: `Mindhunter`,
    src: `somePath`,
    genre: `Comedy`,
    date: 1812,
    posterBig: `img/mindhunter.jpg`,
    rating: 6,
    ratingLevel: `Very good`,
    ratingCount: 233,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    actors: `Frank Sinatra, John Mason, Anthony Mann, Bred Pitt, Heinz Herald`,
    director: `John Mason`,
    previewVideoLink: `somePath`,
    runTime: 300,
  },
  {
    id: 6,
    title: `Mindhunter`,
    src: `somePath`,
    genre: `Comedy`,
    date: 1812,
    posterBig: `img/mindhunter.jpg`,
    rating: 8,
    ratingLevel: `Good`,
    ratingCount: 924,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    actors: `Frank Sinatra, John Mason, Anthony Mann, Bred Pitt, Heinz Herald`,
    director: `Anthony Mann`,
    previewVideoLink: `somePath`,
    runTime: 300,
  },
  {
    id: 7,
    title: `Mindhunter`,
    src: `somePath`,
    genre: `Comedy`,
    date: 1812,
    posterBig: `img/mindhunter.jpg`,
    rating: 1,
    ratingLevel: `Bad`,
    ratingCount: 743,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    actors: `Frank Sinatra, John Mason, Anthony Mann, Bred Pitt, Heinz Herald`,
    director: `Bred Pitt`,
    previewVideoLink: `somePath`,
    runTime: 300,
  },
  {
    id: 8,
    title: `Mindhunter`,
    src: `somePath`,
    genre: `Comedy`,
    date: 1812,
    posterBig: `img/mindhunter.jpg`,
    rating: 4,
    ratingLevel: `Awesome`,
    ratingCount: 433,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    actors: `Frank Sinatra, John Mason, Anthony Mann, Bred Pitt, Heinz Herald`,
    director: `John Mason`,
    previewVideoLink: `somePath`,
    runTime: 300,
  }
];

it(`Should Main render correctly`, () => {
  const tree = renderer.create(<Main
    onChangeGenre={()=>{}}
    onGenreClick={()=>{}}
    films={data}
    allListFilms={data}
    onClickShowMore={()=>{}}
    onClickActiveFilm={()=>{}}
    onFilmWatch={()=>{}}
    authorizationStatus={AuthorizationStatus.AUTH}
    promoFilm={data[0]}
    showedFilmsAmount ={8}
    filmsLength = {16}
    postFavoriteFilms={()=>{}}
    loadFavoriteFilms={()=>{}}
    loadFilms={()=>{}}
    loadPromoFilm={()=>{}}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();
  expect(tree).toMatchSnapshot();
});
