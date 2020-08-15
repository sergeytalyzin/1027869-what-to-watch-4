import AddReview from "./add-review";
import * as renderer from "react-test-renderer";
import * as React from "react";
import {Film} from "../../type";
const film: Film = {
  id: 8,
  title: `Mindhunter`,
  src: `img/mindhunter.jpg`,
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
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  bg: ``,
  bgSrc: `somePath`,
};
it(`Correctly render component Add Reviews`, ()=> {
  const tree = renderer.create(<AddReview onSubmit={()=>{}} activeFilm={film}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
