const express = require('express');
const router = express.Router();
const moongose = require('mongoose');
const passport = require('passport');

//modeli
const Objava = require('../../models/Objava');
const Profil = require('../../models/Profil');

//validacija
const validacijaObjaveInputa = require('../../validation/objava');

// @route GET api/objave
// @desc Uzimanje svih objava
// @access public

router.get('/', (req, res) => {
    Objava.find()
        .sort({ datum: -1 })
        .then(objave => {
            res.json(objave)
        })
        .catch(err => res.status(404).json({ nema: 'Nije pronadjena ni jedna objava' }));
});

// @route GET api/objave/:id
// @desc uzimanje objave po id-u
// @access public

router.get('/:id', (req, res) => {
    Objava.findById(req.params.id)
        .then(objava => {
            res.json(objava)
        })
        .catch(err => res.status(404).json({ nema: 'Ne postoji objava sa tim ID-om' }));
});

// @route POST api/objave
// @desc Kreiranje objava
// @access private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validacijaObjaveInputa(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const sadrzajObjave = {};

    sadrzajObjave.korisnik = req.user.id;

    if (req.body.proizvodjac)
        sadrzajObjave.proizvodjac = req.body.proizvodjac;

    if (req.body.cijena)
        sadrzajObjave.cijena = req.body.cijena;
    else
        sadrzajObjave.cijena = 'Po dogovoru';

    if (req.body.model)
        sadrzajObjave.model = req.body.model;

    if (req.body.godiste)
        sadrzajObjave.godiste = req.body.godiste;

    if (req.body.kilometraza)
        sadrzajObjave.kilometraza = req.body.kilometraza;

    if (req.body.kubikaza)
        sadrzajObjave.kubikaza = req.body.kubikaza;

    if (req.body.kw)
        sadrzajObjave.kw = req.body.kw;

    if (req.body.transmisija)
        sadrzajObjave.transmisija = req.body.transmisija;

    if (req.body.gorivo)
        sadrzajObjave.gorivo = req.body.gorivo;

    if (req.body.brojvrata)
        sadrzajObjave.brojvrata = req.body.brojvrata;

    if (req.body.boja)
        sadrzajObjave.boja = req.body.boja;

    if (req.body.stanje)
        sadrzajObjave.stanje = req.body.stanje;

    if (req.body.detalji)
        sadrzajObjave.detalji = req.body.detalji;
    /*
        if (req.body.imageName)
            sadrzajObjave.slika.imageName = req.body.imageName;
    
        if (req.body.imageData)
            sadrzajObjave.slika.imageData = req.body.imageData;
    */

    sadrzajObjave.slika = {
        imageName: req.body.imageName,
        imageData: req.body.imageData
    };

    new Objava(sadrzajObjave).save().then(objava => res.json(objava));


});

// @route PUT api/objave/update/:id
// @desc azuriranje objave po id-u
// @access private


router.put('/update/:id', passport.authenticate('jwt', { session: false }), (req, res) => {


    const { errors, isValid } = validacijaObjaveInputa(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profil.findOne({ korisnik: req.user.id })
        .then(profil => {
            const novaObjava = {};

            novaObjava.korisnik = req.user.id;

            if (req.body.proizvodjac)
                novaObjava.proizvodjac = req.body.proizvodjac;

            if (req.body.cijena)
                sadrzajObjave.cijena = req.body.cijena;
            else
                sadrzajObjave.cijena = 'Po dogovoru';

            if (req.body.model)
                novaObjava.model = req.body.model;

            if (req.body.godiste)
                novaObjava.godiste = req.body.godiste;

            if (req.body.kilometraza)
                novaObjava.kilometraza = req.body.kilometraza;

            if (req.body.kubikaza)
                novaObjava.kubikaza = req.body.kubikaza;

            if (req.body.kw)
                novaObjava.kw = req.body.kw;

            if (req.body.transmisija)
                novaObjava.transmisija = req.body.transmisija;

            if (req.body.gorivo)
                novaObjava.gorivo = req.body.gorivo;

            if (req.body.brojvrata)
                novaObjava.brojvrata = req.body.brojvrata;

            if (req.body.boja)
                novaObjava.boja = req.body.boja;

            if (req.body.stanje)
                novaObjava.stanje = req.body.stanje;

            if (req.body.detalji)
                novaObjava.detalji = req.body.detalji;

            Objava.findById(req.params.id)
                .then(objava => {

                    if (objava.korisnik.toString() !== req.user.id) {
                        return res.status(401).json({ noauth: 'Korisnik nije autorizovan' }); //Unauthorized status
                    }

                    new Objava(novaObjava).save().then(objava => res.json(objava));
                    objava.remove();
                })
                .catch(err => res.status(404).json({ nema: 'Ne postoji objava sa tim ID-om' }));
        })


});



// @route DELETE api/objave/:id
// @desc BRISANJE objave po id-u
// @access private

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profil.findOne({ korisnik: req.user.id })
        .then(profil => {
            Objava.findById(req.params.id)
                .then(objava => {
                    if (objava.korisnik.toString() !== req.user.id) {
                        return res.status(401).json({ noauth: 'Korisnik nije autorizovan' }); //Unauthorized status
                    }

                    objava.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ nema: 'Ne postoji objava' }));
        })

});

// @route POST api/objave/pitanja/:id
// @desc postavljanje pitanja i odgovora
// @access private

router.post('/pitanja/:id', passport.authenticate('jwt', { session: false }), (req, res) => {


    Objava.findById(req.params.id)
        .then(objava => {

            const novoPitanje = {
                tekst: req.body.tekst,
                ime: req.body.ime,
                korisnik: req.user.id
            }

            objava.pitanja.unshift(novoPitanje);
            objava.save().then(objava => res.json(objava));
        }).catch(err => res.status(404).json({ nema: 'Ne postoji takva objava' }));

});

// @route DELETE api/objave/pitanja/:id/:pitanje_id
// @desc brisanje pitanja
// @access private

router.delete('/pitanja/:id/:pitanje_id', passport.authenticate('jwt', { session: false }), (req, res) => {


    Objava.findById(req.params.id)
        .then(objava => {
            if (objava.pitanja.filter(pitanje => pitanje._id.toString() === req.params.pitanje_id).length === 0) {
                return res.status(404).json({ komentar: 'Komentar ne postoji' });
            }

            const removeIndex = objava.pitanja
                .map(item => item._id.toString())
                .indexOf(req.params.pitanje_id);

            objava.pitanja.splice(removeIndex, 1);

            objava.save().then(objava => res.json(objava))

        }).catch(err => res.status(404).json({ nema: 'Ne postoji takva objava' }));

});

module.exports = router;