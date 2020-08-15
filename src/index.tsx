import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import App from "./components/app/app";
import thunk from "redux-thunk";
import {createAPI} from "./api";
import reducer from "./reducer/reducer";
import {Operation as DataOperation} from "./reducer/data/data";
import {Operation as UserOperation, ActionCreators, AuthorizationStatus} from "./reducer/user/user";
import {authorizationLocalStorage} from "./reducer/user/user";


const onUnAuthorized = () => {
  authorizationLocalStorage.clear();
  authorizationLocalStorage.setItem(AuthorizationStatus.NO_AUTH);
  store.dispatch(ActionCreators.requireAuthorization(authorizationLocalStorage.getAll()));
};


const api = createAPI(onUnAuthorized);

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api))
));

store.dispatch(DataOperation.loadFilms());
store.dispatch(DataOperation.promoFilm());
store.dispatch(UserOperation.checkAuth());
store.dispatch(DataOperation.loadFavoriteFilms());


ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>
    ,
    document.querySelector(`#root`)
);

