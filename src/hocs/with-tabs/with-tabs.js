import React, {PureComponent} from "react";


const TABS = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
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


  WithActiveTab.propTypes = {};
  return WithActiveTab;
};

export default withActiveTab;

