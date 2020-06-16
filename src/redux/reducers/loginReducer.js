import {  LOGOUT, ATTEMPT_LOGIN, INVALID_LOGIN, LOGIN_ERROR, SUCCESSFUL_LOGIN, INVALID_SIGNUP, SUCCESSFUL_SIGNUP } from '../actionTypeConstants';
import { LOGIN_STATUS} from '../../constants'

const initialState = {
    status: LOGIN_STATUS.LOGGED_OUT
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ATTEMPT_LOGIN:
            return {
                status: LOGIN_STATUS.REQUESTED
            }
        case SUCCESSFUL_LOGIN:
            return {
                status: LOGIN_STATUS.SUCCESSFUL
            }
        case LOGIN_ERROR:
            return {
                status: LOGIN_STATUS.ERROR
            }
        case INVALID_LOGIN:
            return {
                status: LOGIN_STATUS.INVALID
            }
        case INVALID_SIGNUP:
            return {
                status: LOGIN_STATUS.INVALID_SIGNUP
            }
        case SUCCESSFUL_SIGNUP:
                return {
                    status: LOGIN_STATUS.SUCCESSFUL_SIGNUP
                }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}