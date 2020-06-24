import { combineReducers } from "redux";
import chatRoom from "./chatRoom";
import checkBoxes from "./checkBoxes";
import movieFilter from "./movieFilter";
import movieList from "./movieList";
import click from "./click";
import userReducer from './userReducer';
import loginReducer from './loginReducer';
import reviewReducer from './reviewReducer';
import fetchFlag from './fetchFlag';
import signupFlag from "./signupFlag";
export default combineReducers({chatRoom, checkBoxes, movieFilter, movieList, click, userReducer, loginReducer, reviewReducer, fetchFlag, signupFlag});