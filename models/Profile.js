const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    username: {
        type: String,
        required: true,
        max: 25
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    links: {
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        twitter: {
            type: String
        }
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);