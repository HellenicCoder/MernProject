const { timeStamp } = require('console')
const mongoose = require('mongoose')
const { type } = require('os')

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        require: [true, "please add contact name"]
    },
    email: {
        type: String,
        require: [true, "please add contact email"]
    },
    phone: {
        type: String,
        require: [true, "please add contact phone"]
    }
}, {
    timeStamp: true
})
module.exports = mongoose.model('contact', contactSchema)