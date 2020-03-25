const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = mongoose.Schema({
    writer : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title : {
        type: String,
        maxLength: 50
    },
    description: {
        type:  String
    },
    privacy: {
        type:  Number
    },
    imageFilePath: {
        type: String
    },
    musicFilePath: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
}, {timestamps : true});

const Music = mongoose.model('Music', musicSchema);

module.exports = { Music: Music };