import NameSpace from "../name-space";

export const getAuthorizationStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};
