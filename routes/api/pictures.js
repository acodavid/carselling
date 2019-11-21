const express = require('express');
const router = express.Router();
const passport = require('passport');

const Picture = require('../../models/Picture');

const validationPicture = require('../../validation/pictures');

// @route GET api/pictures/car/:id
// @desc get all pictures from specific car
// @access private
router.get('/car/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Picture
        .findOne()
        .where('car')
        .equals(req.params.id)
        .then(picture => {
            res.json(picture)
        })
        .catch(err => res.status(404).json({ notFound: 'There is not any!!!' }))

})

// @route POST api/pictures
// @desc post picture for car
// @access private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validationPicture(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPicture = {
        user: req.body.user,
        car: req.body.car,
        front: {
            imageName1: req.body.imageName1,
            imageData1: req.body.imageData1
        },
        back: {
            imageName2: req.body.imageName2,
            imageData2: req.body.imageData2
        },
        left: {
            imageName3: req.body.imageName3,
            imageData3: req.body.imageData3
        },
        right: {
            imageName4: req.body.imageName4,
            imageData4: req.body.imageData4
        },
        inside: {
            imageName5: req.body.imageName5,
            imageData5: req.body.imageData5
        }
    };

    new Picture(newPicture).save().then(picture => res.json(picture));


})

// @route PUT api/pictures/update
// @desc edit pictures for car
// @access private
router.put('/update', passport.authenticate('jwt', { session: false }), (req, res) => {

    const newPicture = {
        user: req.body.user,
        car: req.body.car,
        front: {
            imageName1: req.body.imageName1,
            imageData1: req.body.imageData1
        },
        back: {
            imageName2: req.body.imageName2,
            imageData2: req.body.imageData2
        },
        left: {
            imageName3: req.body.imageName3,
            imageData3: req.body.imageData3
        },
        right: {
            imageName4: req.body.imageName4,
            imageData4: req.body.imageData4
        },
        inside: {
            imageName5: req.body.imageName5,
            imageData5: req.body.imageData5
        }
    };

    Picture.findByIdAndUpdate({ _id: req.body._id }, { $set: newPicture }, { new: true })
        .then(picture => res.json(picture));


})

// @route DELETE api/pictures/:id
// @desc delete pictures with specific id
// @access private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Picture.findById(req.params.id)
        .then(picture => {
            if (picture.user.toString() !== req.user.id) {
                return res.status(401).json({ noAuth: 'User not authorized' });
            }
            picture.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ notFound: 'There is not any picture with that id' }))

});

module.exports = router;