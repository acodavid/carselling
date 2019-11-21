import axios from 'axios';
import { GET_PICTURES, CLEAR_PICTURES, ADDING_PICTURES, UPDATE_PICTURES, DELETE_PICTURES, GET_ERRORS, CLEAR_ERRORS } from './types';

export const postPictures = (pictures, history) => dispatch => {

    dispatch(clearErrors());
    dispatch(setLoading(true));

    axios.post('/api/pictures', pictures)
        .then(res => {
            history.push(`/car/${pictures.car}`);
            dispatch(setLoading(false));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            dispatch(setLoading(false));
        })

}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};

export const updatePictures = (pictures, history) => dispatch => {

    dispatch(setLoading(true));

    axios.put('/api/pictures/update', pictures)
        .then(res => {
            dispatch({
                type: UPDATE_PICTURES,
                payload: res.data
            });
            history.push(`/car/${pictures.car}`);
        })
        .catch(err => {
            console.log(err);
            dispatch(setLoading(false));
        })

}

export const getPictures = car_id => dispatch => {

    axios.get(`/api/pictures/car/${car_id}`)
        .then(res => {
            dispatch({
                type: GET_PICTURES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_PICTURES,
                payload: null
            })
        })

}

export const deletePictures = (id, history, car) => dispatch => {

    if (window.confirm('Are you sure you want to delete all pictures? (This will redirect you to adding photos form)')) {
        axios.delete(`/api/pictures/${id}`)
            .then(res => {
                dispatch({
                    type: DELETE_PICTURES,
                    payload: res.data
                })
                history.push(`/add/pictures/car/${car}`);
            })
            .catch(err => {
                console.log(err);
            })
    }



}

export const clearPictures = () => {
    return {
        type: CLEAR_PICTURES
    };
}

export const setLoading = (trueOrFalse) => {
    return {
        type: ADDING_PICTURES,
        payload: trueOrFalse
    };
};



