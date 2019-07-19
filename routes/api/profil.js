const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Ucitavanje validacije
const validacijaProfilInputa = require('../../validation/profil');

//Ucitavanje Profil modela
const Profil = require('../../models/Profil');

//Ucitavanje Korisnik modela
const Korisnik = require('../../models/Korisnik');

// @route GET api/profil
// @desc Profil logovanog korisnika
// @access private

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const errors = {};

    Profil.findOne({ korisnik: req.user.id })
        .populate('korisnik', ['ime', 'datum'])
        .then(profil => {
            if (!profil) {
                errors.noProfile = 'Ovaj korisnik nema profil'
                return res.status(404).json(errors)
            } else {
                res.json(profil);
            }
        }).catch(eror => res.status(404).json(eror));
});

// @route GET api/profil/korisnickoime/:korisnickoIme
// @desc get profila pomocu korisnickoIme
// @access public

router.get('/korisnickoime/:korisnickoIme', (req, res) => {
    const errors = {};

    Profil.findOne({ korisnickoIme: req.params.korisnickoIme })
        .populate('korisnik', ['ime', 'datum'])
        .then(profil => {
            if (!profil) {
                errors.noProfile = 'Ovaj korisnik nema profil';
                res.status(404).json(errors);
            }

            res.json(profil);
        })
        .catch(eror => res.status(404).json(eror));
});

// @route GET api/profil/korisnik/:user_id
// @desc get profila pomocu user id
// @access public

router.get('/korisnik/:user_id', (req, res) => {
    const errors = {};

    Profil.findOne({ korisnik: req.params.user_id })
        .populate('korisnik', ['ime', 'datum'])
        .then(profil => {
            if (!profil) {
                errors.noProfile = 'Ovaj korisnik nema profil';
                res.status(404).json(errors);
            }

            res.json(profil);
        })
        .catch(eror => res.status(404).json({ noProfile: 'Ovaj korisnik nema profil' }));
});

// @route POST api/profil
// @desc Kreiranje profila logovanog korisnika, editovanje
// @access private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validacijaProfilInputa(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const sadrzajProfila = {};
    sadrzajProfila.korisnik = req.user.id; //sadrzaj ce biti popunjen korisnik podacima - id

    if (req.body.korisnickoIme)
        sadrzajProfila.korisnickoIme = req.body.korisnickoIme;

    if (req.body.brojTelefona)
        sadrzajProfila.brojTelefona = req.body.brojTelefona;  //profil podatak o broju telefona

    if (req.body.adresa)
        sadrzajProfila.adresa = req.body.adresa;  // adresa Profil

    sadrzajProfila.linkovi = {}; // linkovi: facebook, instagram, twitter

    if (req.body.facebook)
        sadrzajProfila.linkovi.facebook = req.body.facebook;

    if (req.body.instagram)
        sadrzajProfila.linkovi.instagram = req.body.instagram;

    if (req.body.twitter)
        sadrzajProfila.linkovi.twitter = req.body.twitter;

    Profil.findOne({ korisnik: req.user.id }).then(profil => {
        if (profil) {
            //edit 
            Profil.findOneAndUpdate({ korisnik: req.user.id }, { $set: sadrzajProfila }, { new: true }).then(profil => {
                res.json(profil);
            });
        }
        else {
            //kreiranje
            Profil.findOne({ korisnickoIme: sadrzajProfila.korisnickoIme }).then(profil => {
                if (profil) {
                    errors.korisnickoIme = 'Korisnicko ime je zauzeto';
                    res.status(400).json(errors);
                }
            });
            new Profil(sadrzajProfila).save().then(profil => res.json(profil));
        }
    });

});

// @route   DELETE api/profil
// @desc    Brisanje korisnika i njegovog profila
// @access  Private
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profil.findOneAndRemove({ korisnik: req.user.id }).then(() => {
            Korisnik.findOneAndRemove({ _id: req.user.id }).then(() =>
                res.json({ success: true })
            );
        });
    }
);

module.exports = router;