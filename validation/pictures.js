const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validationPictures(data) {

    let errors = {};

    data.imageData1 = !isEmpty(data.imageData1) ? data.imageData1 : '';
    data.imageData2 = !isEmpty(data.imageData2) ? data.imageData2 : '';
    data.imageData3 = !isEmpty(data.imageData3) ? data.imageData3 : '';
    data.imageData4 = !isEmpty(data.imageData4) ? data.imageData4 : '';
    data.imageData5 = !isEmpty(data.imageData5) ? data.imageData5 : '';

    if (Validator.isEmpty(data.imageData1) || Validator.isEmpty(data.imageData2) || Validator.isEmpty(data.imageData3) || Validator.isEmpty(data.imageData4) || Validator.isEmpty(data.imageData5)) {
        errors.pictures = 'You must add all photos of your car to proceed';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}