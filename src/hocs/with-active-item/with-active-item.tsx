import * as React from "react";
import {Subtract} from "utility-types";

interface Props {
  active: string|number|object|boolean
}

interface State {
  active: string|number|object|boolean
}

interface InjectingProps {
  handleClickItem: ()=> void
  active: string|number|object|boolean
}

const withActiveItem = (Component) => {
  type P = React.ComponentProps<typeof Component>

  type T = Props & Subtract<P, InjectingProps>

  class WithActiveItem extends React.PureComponent<T,State> {
    constructor(props) {
      super(props);
      this.state = {
        active: this.props.active,
      };

      this._handleClickItem = this._handleClickItem.bind(this);
    }

    _handleClickItem(activeItem) {
      this.setState({active: activeItem});
    }

    render() {
      const {active} = this.state;
      return <Component
        {...this.props}
        handleClickItem= {this._handleClickItem}
        active = {active}
      />;
    }
  }

  return WithActiveItem;
};

export default withActiveItem;


