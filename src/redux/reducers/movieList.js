import {POPULATE_MOVIES, INCREMENT_COUNTS } from "../actionTypeConstants";

const initialState = {
    allIds: [],
    byIds: {}
};

const movieList = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTS: {
      const {id} = action.payload;
      const returnedTarget = {
          allIds: [...state.allIds],
          byIds: {
            ...state.byIds,         
           [id]:{
            ...state.byIds[id],
            savedCount:state.byIds[id].savedCount+1
           }
         }
      }
    return returnedTarget;
  }
    case POPULATE_MOVIES:{
      return action.payload.movies;
    }
    default:
      return state;
  }
}

export default movieList;