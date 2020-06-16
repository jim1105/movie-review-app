import { SET_MOVIE_FILTER } from "../actionTypeConstants";
import { MOVIE_FILTERS } from "../../constants";

const initialState = MOVIE_FILTERS.ALL

const movieFilter = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIE_FILTER: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
};

export default movieFilter;