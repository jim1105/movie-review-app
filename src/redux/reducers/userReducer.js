import { LOGIN, LOGOUT, ADD_MOVIE_TO_USER, COMPLETE_ONBOARDING, FILTER_USED, TOGGLE_BOARDING, POPULATE_USER_MOVIES, ONBOARD} from '../actionTypeConstants';

export const initialState = {
    currentUser: -1,
    username: "none",
    movies: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN: {
            return action.payload
        }
        case LOGOUT: {
            return initialState
        }
        case COMPLETE_ONBOARDING: {
            return{
                ...state,
                onboardingComplete: true
            }
        }
        case ONBOARD: {
            return{
                ...state,
                onboardingComplete: false
            }
        }
        case ADD_MOVIE_TO_USER:{
            const movies = state.movies;
            const updated = [...movies, action.payload.movie];
            return {
                ...state,
                movies: updated
                }
        };
        case TOGGLE_BOARDING: {
            return {
                ...state,
                onboardingComplete: false
            }
        }
        case FILTER_USED: {
            return {
                ...state,
                hasUsedFilter: true
            }
        }
        case POPULATE_USER_MOVIES:{
            return action.payload.userMovies;
        }
        default:
            return state;
    }
}