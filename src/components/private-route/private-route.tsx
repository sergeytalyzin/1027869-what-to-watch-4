import * as React from "react";

import {Route, Redirect, RouteProps} from "react-router-dom";
import {AppRoute} from "../../const";
import {AuthorizationStatus} from "../../reducer/user/user";


interface Props extends RouteProps {
  auth: string,
  render: (routerProps:any) => React.ReactNode,
  children?: any

}

const PrivateRoute: React.FunctionComponent<Props> = (props:Props) => {
  const {auth, render} = props;
  return (
    <Route
      {...props}
      render={(routeProps) => auth === AuthorizationStatus.AUTH ? (
        render(routeProps)
      ) : (
        <Redirect to={AppRoute.SIGN_IN} />
      )}
    />
  );
};


export default PrivateRoute;
