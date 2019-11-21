const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: 'cars'
    },
    front: {
        imageName1: {
            type: String
        },
        imageData1: {
            type: String
        }
    },
    back: {
        imageName2: {
            type: String
        },
        imageData2: {
            type: String
        }
    },
    left: {
        imageName3: {
            type: String
        },
        imageData3: {
            type: String
        }
    },
    right: {
        imageName4: {
            type: String
        },
        imageData4: {
            type: String
        }
    },
    inside: {
        imageName5: {
            type: String
        },
        imageData5: {
            type: String
        }
    }
});

module.exports = Picture = mongoose.model('pictures', PictureSchema);