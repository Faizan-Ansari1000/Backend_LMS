const express = require('express');
const Std = require('../models/stdModel');
const stdRoute = express.Router();

stdRoute.post('/studentData', async (req, res) => {
    const { name, email, percentage, phone, address, course, dob, comment } = req.body;

    try {

        if (!name || !email || !percentage || !phone || !address || !course || !dob) {
            return res.status(400).json({
                message: 'Some fields are missing!',
                description: 'Please check all the fields.',
            });
        }


        const existingStudent = await Std.findOne({ $or: [{ email }, { phone }] });
        if (existingStudent) {
            return res.status(409).json({
                message: 'Student already exists!',
                description: 'A student with the same email or phone already exists.',
            });
        }


        const newStudent = new Std({ name, email, percentage, phone, address, course, dob, comment });
        await newStudent.save();

        res.status(201).json({
            isSuccessfully: true,
            message: 'Student data has been saved successfully!',
            data: newStudent,
        });
    } catch (error) {
        console.error('Error saving student data:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
});


stdRoute.get('/studentData', async (req, res) => {
    try {
        
        const students = await Std.find();
        res.status(200).json({
            isSuccessfully: true,
            message: 'Student data retrieved successfully!',
            data: students,
        });
    } catch (error) {
        console.error('Error retrieving student data:', error);
        res.status(500).json({
            isSuccessfully: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
});

module.exports = stdRoute;
