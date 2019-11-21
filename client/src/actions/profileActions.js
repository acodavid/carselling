import axios from 'axios';
import { GET_PROFILE, GET_ERRORS, CLEAR_ERRORS, CLEAR_CURRENT_PROFILE, GET_PROFILE_BY_ID, SET_CURRENT_USER, CLEAR_SINGLE_PROFILE, GET_PROFILE_BY_USERNAME } from './types';

export const getCurrentProfile = () => dispatch => {
    axios.get('/api/profile')
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        });
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};

export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};

export const clearSingleProfile = () => {
    return {
        type: CLEAR_SINGLE_PROFILE
    }
}

export const createProfile = (profile, history) => dispatch => {
    dispatch(clearErrors());
    axios.post('/api/profile', profile)
        .then(res => {
            history.push('/profile');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const getProfileById = user_id => dispatch => {
    axios.get(`/api/profile/user/${user_id}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE_BY_ID,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILE_BY_ID,
                payload: null
            })
        });
}

export const getProfileByUsername = username => dispatch => {
    axios.get(`/api/profile/username/${username}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE_BY_USERNAME,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILE_BY_USERNAME,
                payload: null
            })
        })
}

export const deleteProfile = () => dispatch => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
        axios
            .delete('/api/profile')
            .then(res =>
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            )
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    }
};