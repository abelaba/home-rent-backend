const mongoose = require('mongoose');

// * RENTAL SCHEMA

const rentalSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    rentalImage: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Rental', rentalSchema);
