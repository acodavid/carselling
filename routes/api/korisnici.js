const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Ucitavanje Validacije
const validacijaRegisterInputa = require('../../validation/register');
const validacijaLoginInputa = require('../../validation/login');

//Ucitavanje Korisnik modela
const Korisnik = require('../../models/Korisnik');

// @route POST api/korisnici/register
// @desc Registracija korisnika
// @access public
router.post('/register', (req, res) => {

    const { errors, isValid } = validacijaRegisterInputa(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    };

    Korisnik.findOne({ email: req.body.email })
        .then(korisnik => {
            if (korisnik) {
                errors.email = 'Email vec postoji';
                return res.status(400).json({ errors });
            } else {
                const noviKorisnik = new Korisnik({
                    ime: req.body.ime,
                    email: req.body.email,
                    lozinka: req.body.lozinka
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(noviKorisnik.lozinka, salt, (err, hash) => {
                        if (err) throw err;
                        noviKorisnik.lozinka = hash;
                        noviKorisnik.save()
                            .then(korisnik => res.json(korisnik))
                            .catch(err => console.log(err));
                    });

                });
            }
        });
});

// @route POST api/korisnici/login
// @desc Login korisnika / vracanje JWT TOKEN-a
// @access public
router.post('/login', (req, res) => {

    const { errors, isValid } = validacijaLoginInputa(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    };

    const email = req.body.email;
    const lozinka = req.body.lozinka;

    //pronalazak korisnika po email-u
    Korisnik.findOne({ email }).then(korisnik => {
        if (!korisnik) {
            errors.email = 'Korisnik nije pronadjen';
            return res.status(404).json(errors);
        };
        //provjera lozinke
        bcrypt.compare(lozinka, korisnik.lozinka).then(isMatch => {
            if (isMatch) {
                //Korisnik je pronadjen

                //jwt payload
                const payload = { id: korisnik.id, ime: korisnik.ime }

                jwt.sign(payload, keys.secretOrKey, { expiresIn: 7200 }, (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                });

            } else {
                errors.lozinka = 'Lozinka netacna';
                return res.status(400).json(errors)
            };
        })

    });
});

// @route get api/korisnici/current
// @desc vraca trenutnog korisnika
// @access private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        ime: req.user.ime,
        email: req.user.email
    });
});


module.exports = router;