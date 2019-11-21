import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import carReducer from './carReducer';
import pictureReducer from './pictureReducer'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    cars: carReducer,
    pictures: pictureReducer
});