import {combineReducers} from "redux";
import {reducer as appStatus} from "./app-status/app-status";
import {reducer as data} from "./data/data";
import {reducer as user} from "./user/user";
import NameSpace from "./name-space";

export default combineReducers({
  [NameSpace.APP_STATUS]: appStatus,
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
});
