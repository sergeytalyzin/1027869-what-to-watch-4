import * as React from "react";
import {Subtract} from "utility-types";


const TABS = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

interface State {
  active: string
}

interface InjectingProps {
  activeTab: string,
  handleTabClick: ()=> void
}

const withActiveTab = (Component) => {
  type P = React.ComponentProps<typeof Component>


  type T = Subtract<P, InjectingProps>

  class WithActiveTab extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      this.state = {
        active: TABS.OVERVIEW,
      };
      this._handleTabClick = this._handleTabClick.bind(this);
    }

    _handleTabClick(tab) {
      this.setState({active: tab});
    }

    render() {
      const {active} = this.state;
      return <Component
        {...this.props}
        activeTab = {active}
        handleTabClick = {this._handleTabClick}
      />;
    }
  }



  return WithActiveTab;
};

export default withActiveTab;

