import * as React from "react";
import * as renderer from "react-test-renderer";
import MovieList from "./movie-list";
import {Film} from "../../type";

const data: Film[] = [
  {
    id: Math.random(),
    title: `Mindhunter`,
    src: `somePath`,
    genre: `Comedy`,
    date: 1812,
    previewVideoLink: `somePath`,
  },
  {
    id: Math.random(),
    title: `Midnight Special`,
    src: `somePath`,
    genre: `Comedy`,
    date: 1812,
    previewVideoLink: `somePath`,
  },
  {
    id: Math.random(),
    title: `Mindhunter`,
    src: `somePath`,
    genre: `Comedy`,
    date: 1812,
    previewVideoLink: `somePath`,
  },
  {
    id: Math.random(),
    title: `Midnight Special`,
    src: `somePath`,
    genre: `Comedy`,
    date: 1812,
    previewVideoLink: `somePath`,
  },
];

it(`Should MovieList render correctly`, ()=>{
  const tree = renderer.create(<MovieList
    films={data}
    onActiveFilm={()=>{}}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
