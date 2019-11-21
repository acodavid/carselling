const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    prize: {
        type: String
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    kilometrage: {
        type: String,
        required: true
    },
    cubic: {
        type: String,
        required: true
    },
    kilowatts: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    doors: {
        type: String,
        required: true
    },
    colour: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    picture: {
        imageName: {
            type: String
        },
        imageData: {
            type: String
        }
    },
    questions: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'korisnici'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = Car = mongoose.model('cars', CarSchema);