import {extend} from "../../utils.js";
import StoreLocal from "../../localStorage/localStorage";


const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const authorizationLocalStorage = new StoreLocal(`AuthorizationStatus`);

const initialState = {
  authorizationStatus: authorizationLocalStorage.getAll()|| AuthorizationStatus.NO_AUTH,
};

const ActionTypes = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
};

const ActionCreators = {
  requireAuthorization: (status) => ({
    type: ActionTypes.REQUIRE_AUTHORIZATION,
    payload: status,
  })
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((res) => {
        if (res.status === 200) {
          authorizationLocalStorage.clear();
          authorizationLocalStorage.setItem(`AUTH`);
          dispatch(ActionCreators.requireAuthorization(authorizationLocalStorage.getAll()));
        } else {
          authorizationLocalStorage.clear();
          authorizationLocalStorage.setItem(`NO_AUTH`);
          dispatch(ActionCreators.requireAuthorization(authorizationLocalStorage.getAll()));
        }
      })
      .catch((err) => {
        throw err;
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then(() => {
        authorizationLocalStorage.clear();
        authorizationLocalStorage.setItem(`AUTH`);
        dispatch(ActionCreators.requireAuthorization(authorizationLocalStorage.getAll()));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUIRE_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });
  }
  return state;
};


export {reducer, ActionCreators, ActionTypes, Operation, AuthorizationStatus};
