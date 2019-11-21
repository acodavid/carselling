const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const cars = require('./routes/api/cars');
const pictures = require('./routes/api/pictures')
const path = require('path');

const app = express();

//body-parser middleware
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

// DB konfiguracija
const db = require('./config/keys').mongoURI;

// Konektovanje prema MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.log(err));

//pasport middleware
app.use(passport.initialize());

//passport configg
require('./config/passport')(passport);

// use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/cars', cars);
app.use('/api/pictures', pictures);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));

