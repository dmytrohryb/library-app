import {PERSONAL_BLOCK_CHANGE_USER} from "./actions";

const defaultState = {
    user: null
}

export const personalBlockReducer = (state = defaultState, action) => {
    switch (action.type){
        case PERSONAL_BLOCK_CHANGE_USER:
            return {
                ...state,
                user: action.payload
            }
    }
    return state
}
