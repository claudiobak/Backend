const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
    identifier: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true,
        lowercase: true
    },
    review: {
        type: String,
        required: true,
        lowercase: true
    }
})

const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet