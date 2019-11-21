import { GET_PROFILE, CLEAR_CURRENT_PROFILE, GET_PROFILE_BY_ID, GET_PROFILE_BY_USERNAME, CLEAR_SINGLE_PROFILE } from '../actions/types'

const initialState = {
    profile: null,
    singleProfile: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        case CLEAR_SINGLE_PROFILE:
            return {
                ...state,
                singleProfile: null
            }
        case GET_PROFILE_BY_ID:
            return {
                ...state,
                singleProfile: action.payload
            }
        case GET_PROFILE_BY_USERNAME:
            return {
                ...state,
                singleProfile: action.payload
            }
        default:
            return state;
    }
}