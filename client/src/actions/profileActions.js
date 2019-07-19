import axios from 'axios';
import { GET_PROFILE, GET_ERRORS, CLEAR_ERRORS, CLEAR_CURRENT_PROFILE, GET_PROFILE_BY_ID, SET_CURRENT_USER } from './types';

export const getCurrentProfile = () => dispatch => {
    axios.get('/api/profil')
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(er => {
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

export const createProfile = (profile, history) => dispatch => {
    dispatch(clearErrors());
    axios.post('/api/profil', profile)
        .then(res => {
            history.push('/profile');
        })
        .catch(eror => {
            dispatch({
                type: GET_ERRORS,
                payload: eror.response.data
            })
        });
}

export const getProfileById = user_id => dispatch => {
    axios.get(`/api/profil/korisnik/${user_id}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE_BY_ID,
                payload: res.data
            })
        })
        .catch(eror => {
            dispatch({
                type: GET_PROFILE_BY_ID,
                payload: null
            })
        });
}

export const deleteProfile = () => dispatch => {
    if (window.confirm('Da li ste sigurni da želite izbrisati vaš profil!')) {
        axios
            .delete('/api/profil')
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