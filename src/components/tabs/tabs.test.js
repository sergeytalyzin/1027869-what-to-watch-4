import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";


it(`MoviePageDetails is rendered correctly`, () => {
  const tree = renderer.create(<Tabs
    activeTab={`overview`}
    handleTabClick={()=>{}}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
