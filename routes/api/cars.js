const express = require('express');
const router = express.Router();
const passport = require('passport');

//modeli
const Car = require('../../models/Car');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//validacija
const validationCar = require('../../validation/car');
const validationQuestion = require('../../validation/question');

// @route GET api/cars
// @desc get all cars
// @access public

router.get('/', (req, res) => {
    Car.find()
        .sort({ date: -1 })
        .then(car => {
            res.json(car)
        })
        .catch(err => res.status(404).json({ nnotFound: 'There is not any car' }));
});

// @route GET api/cars/user/:id
// @desc get all cars from one user
// @access 
router.get('/user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Car.find().where('user').equals(req.params.id)
        .sort({ date: -1 })
        .then(cars => {
            res.json(cars)
        })
        .catch(err => {
            res.status(404);
            console.log(err);
        })

});

// @route GET api/cars/:id
// @desc get car by id
// @access public

router.get('/:id', (req, res) => {
    Car.findById(req.params.id)
        .then(car => {
            res.json(car)
        })
        .catch(err => res.status(404).json({ nnotFound: 'There is not any car with this id' }));
});

// @route POST api/cars
// @desc create car
// @access private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validationCar(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }



    const newCar = {};

    newCar.user = req.user.id;

    if (req.body.brand)
        newCar.brand = req.body.brand;

    if (req.body.prize)
        newCar.prize = req.body.prize;
    else
        newCar.cijena = 'Price negotiable';

    if (req.body.model)
        newCar.model = req.body.model;

    if (req.body.year)
        newCar.year = req.body.year;

    if (req.body.kilometrage)
        newCar.kilometrage = req.body.kilometrage;

    if (req.body.cubic)
        newCar.cubic = req.body.cubic;

    if (req.body.kilowatts)
        newCar.kilowatts = req.body.kilowatts;

    if (req.body.transmission)
        newCar.transmission = req.body.transmission;

    if (req.body.fuelType)
        newCar.fuelType = req.body.fuelType;

    if (req.body.doors)
        newCar.doors = req.body.doors;

    if (req.body.colour)
        newCar.colour = req.body.colour;

    if (req.body.condition)
        newCar.condition = req.body.condition;

    if (req.body.details)
        newCar.details = req.body.details;

    newCar.picture = {
        imageName: req.body.imageName,
        imageData: req.body.imageData
    };

    new Car(newCar).save().then(car => res.json(car));


});

// @route PUT api/cars/update
// @desc update car
// @access private


router.put('/update', passport.authenticate('jwt', { session: false }), (req, res) => {


    const { errors, isValid } = validationCar(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ user: req.user.id })
        .then(user => {

            const newCar = {};

            newCar.user = req.user.id;

            if (req.body.brand)
                newCar.brand = req.body.brand;

            if (req.body.prize)
                newCar.prize = req.body.prize;
            else
                newCar.cijena = 'Price negotiable';

            if (req.body.model)
                newCar.model = req.body.model;

            if (req.body.year)
                newCar.year = req.body.year;

            if (req.body.kilometrage)
                newCar.kilometrage = req.body.kilometrage;

            if (req.body.cubic)
                newCar.cubic = req.body.cubic;

            if (req.body.kilowatts)
                newCar.kilowatts = req.body.kilowatts;

            if (req.body.transmission)
                newCar.transmission = req.body.transmission;

            if (req.body.fuelType)
                newCar.fuelType = req.body.fuelType;

            if (req.body.doors)
                newCar.doors = req.body.doors;

            if (req.body.colour)
                newCar.colour = req.body.colour;

            if (req.body.condition)
                newCar.condition = req.body.condition;

            if (req.body.details)
                newCar.details = req.body.details;

            if (req.body.imageName || req.body.imageData) {
                newCar.picture = {
                    imageName: req.body.imageName,
                    imageData: req.body.imageData
                };
            }

            Car.findByIdAndUpdate({ _id: req.body._id }, { $set: newCar }, { new: true })
                .then(car => res.json(car));

        })

});



// @route DELETE api/cars/:id
// @desc delete car by id
// @access private

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Car.findById(req.params.id)
                .then(car => {
                    if (car.user.toString() !== req.user.id) {
                        return res.status(401).json({ noAuth: 'User not authorized' });
                    }

                    car.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ no: 'There is not any car with that id' }));
        })

});

// @route POST api/cars/questions/:id
// @desc questions and answers
// @access private

router.post('/questions/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validationQuestion(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Car.findById(req.params.id)
        .then(car => {

            const newQuestion = {};

            newQuestion.user = req.user.id;
            newQuestion.name = req.body.name;

            if (req.body.text) {
                newQuestion.text = req.body.text
            }

            car.questions.unshift(newQuestion);
            car.save().then(car => res.json(car));
        })
        .catch(err => res.status(404).json({ no: 'There is not any car with that id' }));

});

// @route DELETE api/cars/questions/:id/:question_id
// @desc brisanje pitanja
// @access private

router.delete('/questions/:id/:question_id', passport.authenticate('jwt', { session: false }), (req, res) => {


    Car.findById(req.params.id)
        .then(car => {
            if (car.questions.filter(question => question._id.toString() === req.params.question_id).length === 0) {
                return res.status(404).json({ comment: 'Comment doesnt exist' });
            }

            const removeIndex = car.questions
                .map(item => item._id.toString())
                .indexOf(req.params.question_id);

            car.questions.splice(removeIndex, 1);

            car.save().then(car => res.json(car))

        }).catch(err => res.status(404).json({ no: 'There is not any car with that id' }));

});

module.exports = router;