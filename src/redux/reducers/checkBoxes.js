import { SET_GENRE, TOGGLE_BOX, RESET_CHECKBOX } from "../actionTypeConstants";
import { CHECKBOXES } from "../../constants";


const initialState = CHECKBOXES

const reduceLang = (genre, copyState, num) =>{
  if(genre.id !== num){
    return genre;
  }
  return Object.assign({}, genre, { isChecked: !copyState.GENRES[num-1].isChecked });
}

  const checkBoxes = (state = initialState, action) => {
    switch (action.type) {
        case SET_GENRE: {
          return action.payload;
        }
        case TOGGLE_BOX: {
          const returnedTarget = Object.assign({}, state);
          const { num } = action.payload;
          const newState = state.GENRES.map(genre => reduceLang(genre, returnedTarget, num));
          return {GENRES:newState}
        }
        case RESET_CHECKBOX: {
          return {
            GENRES: [
                {id: 1, value: "Action", isChecked: false},
                {id: 2, value: "Adventure", isChecked: false},
                {id: 3, value: "Animation", isChecked: false},
                {id: 4, value: "Comedy", isChecked: false},
                {id: 5, value: "Crime", isChecked: false},
                {id: 6, value: "Drama", isChecked: false},
                {id: 7, value: "Family", isChecked: false},
                {id: 8, value: "Fantasy", isChecked: false},
                {id: 9, value: "Muscial", isChecked: false},
                {id: 10, value: "Romance", isChecked: false},
                {id: 11, value: "Sci-Fi", isChecked: false},
                {id: 12, value: "Thriller", isChecked: false}
              ]
          }
        }
        default: {
          return state;
        }
      }
    };
  
    export default checkBoxes;