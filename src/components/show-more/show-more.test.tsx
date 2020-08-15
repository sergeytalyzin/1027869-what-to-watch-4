import * as React from "react";
import * as renderer from "react-test-renderer";
import ShowMore from "./show-more";

it(`Should ShowMore render correctly`, ()=>{
  const tree = renderer.create(<ShowMore
    onButtonClick={()=>{}}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
