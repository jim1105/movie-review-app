import { NEW_MESSAGE, TOGGLE_ROOM, NEW_CUSTOMER, TOGGLE_SUPPORT, UPDATE_CUSTOMER} from "../actionTypeConstants";

const initialState = {
    messages: [],
    customers:[],
    showRoom:false,
    showSupport:false
}

export const chatRoom = (state = initialState, action)=>{
    switch (action.type) {
        case NEW_MESSAGE:
            return {...state,
                       messages:action.payload.messages
            }
        case NEW_CUSTOMER:
            return {...state,
                       customers:action.payload.customers
            }
        case UPDATE_CUSTOMER:
            return {...state,
                        customers:action.payload.customers
            }
        case TOGGLE_ROOM:
            return {...state,
                       showRoom:action.payload.showRoom
            }
        case TOGGLE_SUPPORT:
            return {...state,
                        showSupport:action.payload.showSupport
            }
        default:
            return state;
    }
}

export default chatRoom