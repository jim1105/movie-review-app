import { FETCH_FAIL, IS_FETCHING, TOGGLE_FETCH, RESET_FETCH, TOGGLE_FETCHPOST} from "../actionTypeConstants";

const initialState = {
    fetchFail: false,
    isFetching: false,
    isFetchingPost: false
}

export const fetchFlag = (state = initialState, action)=>{
    switch (action.type) {
        case TOGGLE_FETCH:
            return {
                ...state,
                isFetching:false,
                isFetchingPost:false
            };
        case FETCH_FAIL:
            return {
                ...state,
                fetchFail:true,
                isFetching:false
            }
        case IS_FETCHING:
            return {
                ...state,
                fetchFail:false,
                isFetching:true,
                isFetchingPost:true   
            }
        case RESET_FETCH:
            return initialState
        case TOGGLE_FETCHPOST:
            return {
                ...state,
                isFetchingPost:false
            };
        default:
            return state;
    }
}
export default fetchFlag