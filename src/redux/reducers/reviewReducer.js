import {  STORE_REVIEWS } from '../actionTypeConstants';

const initialState = {
    reviews: {},
}

export default function(state = initialState, action) {
    switch (action.type) {
        case STORE_REVIEWS:
            return {reviews: action.payload.reviews}
        
        default:
            return state
    }
}