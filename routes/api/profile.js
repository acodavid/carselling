const express = require('express');
const router = express.Router();
const passport = require('passport');

const validationProfile = require('../../validation/profile');

const Profile = require('../../models/Profile');

const User = require('../../models/User');

// @route GET api/profile
// @desc Profile logged in user
// @access private

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const errors = {};

    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'date'])
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'This user has not profile';
                return res.status(404).json(errors)
            } else {
                res.json(profile);
            }
        }).catch(err => res.status(404).json(err));
});

// @route GET api/profile/username/:username
// @desc Get profile by username
// @access public

router.get('/username/:username', (req, res) => {
    const errors = {};

    Profile.findOne({ username: req.params.username })
        .populate('user', ['name', 'date'])
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'This user has not profile';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route GET api/profile/user/:user_id
// @desc get profile by user id
// @access public

router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'date'])
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'This user has not profile';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json({ noProfile: 'This user has not profile' }));
});

// @route POST api/profile
// @desc Creating profile logged user, edit
// @access private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validationProfile(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newProfile = {};
    newProfile.user = req.user.id;

    if (req.body.username)
        newProfile.username = req.body.username;

    if (req.body.phoneNumber)
        newProfile.phoneNumber = req.body.phoneNumber;

    if (req.body.address)
        newProfile.address = req.body.address;

    newProfile.links = {};

    if (req.body.facebook)
        newProfile.links.facebook = req.body.facebook;

    if (req.body.instagram)
        newProfile.links.instagram = req.body.instagram;

    if (req.body.twitter)
        newProfile.links.twitter = req.body.twitter;

    Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
            //edit 
            Profile.findOneAndUpdate({ user: req.user.id }, { $set: newProfile }, { new: true }).then(profile => {
                res.json(profile);
            });
        }
        else {
            //kreiranje
            Profile.findOne({ username: newProfile.username }).then(profile => {
                if (profile) {
                    errors.username = 'Username already exist';
                    res.status(400).json(errors);
                }
            });
            new Profile(newProfile).save().then(profile => res.json(profile));
        }
    });

});

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOneAndRemove({ user: req.user.id }).then(() => {
            User.findOneAndRemove({ _id: req.user.id }).then(() =>
                res.json({ success: true })
            );
        });
    }
);

module.exports = router;