import { TOGGLE_SIGNUP_FLAG, SET_SIGNUP_FLAG, RESET_SIGNUP_FLAG } from "../actionTypeConstants";

const initialState = false;

const signupFlag = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGNUP_FLAG: {
        return action.payload.click;
    }
    case TOGGLE_SIGNUP_FLAG: {
        return !state
    }
    case RESET_SIGNUP_FLAG: {
        return false
    }
    default: {
      return state;
    }
  }
};

export default signupFlag;