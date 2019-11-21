import isEmpty from '../validation/isEmpty';

import { SET_CURRENT_USER } from '../actions/types';


const initialState = {
    isLogged: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isLogged: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}