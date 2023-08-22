const mongoose= require('mongoose');
const { Schema } = require('mongoose');

const memoSchema = new Schema({
    detail: {
        type: String,
        require: true
    },
    writer: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    }
})

const memoCollection = mongoose.model('memoModel', memoSchema, 'memoCollection');

module.exports = memoCollection;