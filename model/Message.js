const mongoose = require('mongoose');

// * USER SCHEMA

const messageSchema = new mongoose.Schema({
    senderEmail:{
        type:String,
        required:"senderEmail is required"
    },
    senderName:{
        type:String,
        required:"senderName is required"
    },
    message:{
        type:String,
        required:"Message is required",
    },
    time:{
        type:Date,
        default:Date.now
    }
});



module.exports = mongoose.model('Message', messageSchema);