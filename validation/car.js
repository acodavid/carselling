const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validationCar(data) {
    let errors = {};

    data.brand = !isEmpty(data.brand) ? data.brand : '';
    data.model = !isEmpty(data.model) ? data.model : '';
    data.year = !isEmpty(data.year) ? data.year : '';
    data.kilometrage = !isEmpty(data.kilometrage) ? data.kilometrage : '';
    data.cubic = !isEmpty(data.cubic) ? data.cubic : '';
    data.kilowatts = !isEmpty(data.kilowatts) ? data.kilowatts : '';
    data.transmission = !isEmpty(data.transmission) ? data.transmission : '';
    data.fuelType = !isEmpty(data.fuelType) ? data.fuelType : '';
    data.doors = !isEmpty(data.doors) ? data.doors : '';
    data.colour = !isEmpty(data.colour) ? data.colour : '';
    data.condition = !isEmpty(data.condition) ? data.condition : '';
    data.details = !isEmpty(data.details) ? data.details : '';

    if (Validator.isEmpty(data.brand)) {
        errors.brand = 'Choose brand';
    }

    if (Validator.isEmpty(data.model)) {
        errors.model = 'Model is required';
    }

    if (!(data.year >= 1900 && data.year <= 2019)) {
        errors.year = 'Year must be between 1900 and 2019';
    }

    if (!Validator.isLength(data.year, { min: 4, max: 4 })) {
        errors.year = 'Year is not valid (format 19xx/20xx)';
    }

    if (!Validator.isNumeric(data.year)) {
        errors.year = 'Year is not valid (format 19xx/20xx)';
    }

    if (Validator.isEmpty(data.year)) {
        errors.year = 'Year is required';
    }

    if (!Validator.isNumeric(data.kilometrage)) {
        errors.kilometrage = 'Kilometrage is not valid';
    }

    if (Validator.isEmpty(data.kilometrage)) {
        errors.kilometrage = 'Kilometrage is required';
    }

    if (Validator.isEmpty(data.cubic)) {
        errors.cubic = 'Cubic is required';
    }

    if (!Validator.isNumeric(data.kilowatts)) {
        errors.kilowatts = 'Kilowatts are not valid';
    }

    if (Validator.isEmpty(data.kilowatts)) {
        errors.kilowatts = 'Kilowatts are required';
    }

    if (Validator.isEmpty(data.transmission)) {
        errors.transmission = 'Transmission is required';
    }

    if (Validator.isEmpty(data.fuelType)) {
        errors.fuelType = 'Fuel type is required';
    }

    if (Validator.isEmpty(data.doors)) {
        errors.doors = 'Doors is required';
    }

    if (Validator.isEmpty(data.colour)) {
        errors.colour = 'Colour is required';
    }

    if (Validator.isEmpty(data.condition)) {
        errors.condition = 'Condition is required';
    }

    if (!Validator.isLength(data.details, { min: 5, max: 600 })) {
        errors.details = 'Extra details must be between 5 and 600 characters';
    }

    if (Validator.isEmpty(data.details)) {
        errors.details = 'Extra details are required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};