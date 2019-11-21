import axios from 'axios';
import { GET_ERRORS, GET_CARS, GET_CAR, CLEAR_ERRORS, DELETE_CAR, UPDATE_CAR, CLEAR_CAR, GET_CARS_USER_ID, CLEAR_USER_CARS, FORM_LOADING } from './types';

export const postCar = (car, history) => dispatch => {

    dispatch(clearErrors());
    dispatch(setLoading(true));

    axios.post('/api/cars', car)
        .then(res => {
            history.push('/cars');
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

export const setLoading = (trueOrFalse) => {
    return {
        type: FORM_LOADING,
        payload: trueOrFalse
    };
};

export const updateCar = (car, history) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoading(true));

    axios.put('/api/cars/update', car)
        .then(res => {
            dispatch({
                type: UPDATE_CAR,
                payload: res.data
            });
            history.push(`/car/${car._id}`);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            dispatch(setLoading(false));
        })
}

export const getCars = () => dispatch => {
    axios.get('/api/cars')
        .then(res => {
            dispatch({
                type: GET_CARS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_CARS,
                payload: null
            })
        })
}

export const getCarsUserId = id => dispatch => {
    axios.get(`/api/cars/user/${id}`)
        .then(res => {
            dispatch({
                type: GET_CARS_USER_ID,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_CARS_USER_ID,
                payload: null
            })
        })
}

export const clearUserCars = () => {
    return {
        type: CLEAR_USER_CARS
    };
};



export const getCarByID = id => dispatch => {
    axios
        .get(`/api/cars/${id}`)
        .then(res =>
            dispatch({
                type: GET_CAR,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_CAR,
                payload: null
            })
        );
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};

export const addQuestion = (carId, questionData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/cars/questions/${carId}`, questionData)
        .then(res =>
            dispatch({
                type: GET_CAR,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const deleteQuestion = (carId, pitanjeId) => dispatch => {
    axios
        .delete(`/api/cars/questions/${carId}/${pitanjeId}`)
        .then(res =>
            dispatch({
                type: GET_CAR,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const deleteCar = (carId, history) => dispatch => {
    if (window.confirm('Are you sure you want to delete this car?')) {

        axios
            .delete(`/api/cars/${carId}`)
            .then(res => {
                dispatch({
                    type: DELETE_CAR,
                    payload: carId
                })
                history.push('/cars')
            })
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );

    }

};

export const clearCar = () => {
    return {
        type: CLEAR_CAR,
        payload: null
    }
}