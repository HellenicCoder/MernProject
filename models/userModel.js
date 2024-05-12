const { timeStamp } = require('console')
const mongoose = require('mongoose')
const { type } = require('os')
const { stringify } = require('querystring')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required : [true , "please add the user name"]
    },
    email: {
        type: String,
        required: [true , "Please add the user email address"],
        unique: [true, "email address already taken"]
    },
    password: {
        type: String,
        required: [true , "please add the user password"]
    }
}, {
    timeStamp: true
})

module.exports = mongoose.model("user", userSchema)