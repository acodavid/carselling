import { GET_CARS, GET_CAR, DELETE_CAR, UPDATE_CAR, CLEAR_CAR, GET_CARS_USER_ID, CLEAR_USER_CARS, FORM_LOADING } from '../actions/types';

const initialState = {
    cars: null,
    car: null,
    userCars: null,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CARS:
            return {
                ...state,
                cars: action.payload
            };
        case GET_CARS_USER_ID:
            return {
                ...state,
                userCars: action.payload
            }
        case GET_CAR:
            return {
                ...state,
                car: action.payload
            };
        case DELETE_CAR:
            return {
                ...state,
                cars: state.cars.filter(car => car._id !== action.payload)
            };
        case UPDATE_CAR:
            return {
                ...state,
                cars: state.cars.map(car => car._id === action.payload.id ? (car = action.payload) : car),
                loading: false
            }
        case CLEAR_CAR:
            return {
                ...state,
                car: action.payload
            }
        case CLEAR_USER_CARS:
            return {
                ...state,
                userCars: null
            }
        case FORM_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}