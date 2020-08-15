
import Enzyme, {shallow} from "enzyme";
import {Route, Redirect} from 'react-router-dom';
import PrivateRoute from "./private-route";
import * as Adapter from "enzyme-adapter-react-16";
import Main from "../main/main";
import * as React from "react";


Enzyme.configure({
  adapter: new Adapter(),
});

describe(`<PrivateRoute/>`, () => {

  it(`passes props to Route component`, () => {
    const {wrapper} = setup();
    expect(wrapper.find(Route).prop(`path`)).toBe(`/scarif`);
  });

  it(`redirects unauthenticated users to login`, () => {
    const {wrapper} = setup();
    const ComponentToRender = wrapper.prop(`render`);
    const redirectWrapper = shallow(<ComponentToRender/>);
    expect(redirectWrapper.find(Redirect).props()).toEqual({
      to: `/login`,
    });
  });

});

function setup() {
  const customProps = {
    path: `/scarif`,
    exact: true,
    render() {
      return <Main/>;
    },
    auth: `NO_AUTH`,
  };

  const wrapper = shallow(<PrivateRoute {...customProps} />);

  return {
    wrapper,
    customProps
  };
}
