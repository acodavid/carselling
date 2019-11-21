import { GET_PICTURES, CLEAR_PICTURES, ADDING_PICTURES, UPDATE_PICTURES } from '../actions/types';

const initialState = {
    pictures: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PICTURES:
            return {
                ...state,
                pictures: action.payload
            }
        case CLEAR_PICTURES:
            return {
                ...state,
                pictures: null
            }
        case ADDING_PICTURES:
            return {
                ...state,
                loading: action.payload
            }
        case UPDATE_PICTURES:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}