const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validationProfile(data) {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : '';
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
    data.address = !isEmpty(data.address) ? data.address : '';


    if (!Validator.isLength(data.username, { min: 3, max: 25 })) {
        errors.username = 'Username must be between 3 and 25 characters';
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username is required';
    }

    if (!Validator.isLength(data.phoneNumber, { min: 9, max: 15 })) {
        errors.phoneNumber = 'Phone number is not valid';
    }

    if (!Validator.isNumeric(data.phoneNumber)) {
        errors.phoneNumber = 'Phone number is not valid';
    }

    if (Validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = 'Phone number is required';
    }

    if (Validator.isEmpty(data.address)) {
        errors.address = 'Address is required';
    }

    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'URL is not valid';
        }
    }

    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'URL is not valid';
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'URL is not valid';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};