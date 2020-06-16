import { TOGGLE_CLICK, SET_CLICK, RESET_CLICK } from "../actionTypeConstants";
import {FALSE } from "../../constants";

const initialState = false;

const click = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLICK: {
        return action.payload.click;
    }
    case TOGGLE_CLICK: {
        return !state
    }
    case RESET_CLICK: {
        return false
    }
    default: {
      return state;
    }
  }
};

export default click;