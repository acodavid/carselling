import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from './types';
import axios from 'axios';

//REGISTER
export const registerUser = (user, history) => dispatch => {
    dispatch(clearErrors());
    axios.post('/api/users/register', user)
        .then(res => {
            history.push('/post-register');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });

};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};

//LOGIN
export const loginUser = (user) => dispatch => {
    dispatch(clearErrors());
    axios.post('/api/users/login', user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(eror => {
            dispatch({
                type: GET_ERRORS,
                payload: eror.response.data
            });
        })
};

//logged user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

//LOGOUT
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));

}

