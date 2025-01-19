const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    percentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    comment: {
        type: String,
        default: '',
    },
});

const Std = mongoose.model('Student', studentSchema)

module.exports = Std
