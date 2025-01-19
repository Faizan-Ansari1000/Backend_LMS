const express = require('express');
const Course = require('../models/courseModel'); 
const courseRoute = express.Router();

courseRoute.post('/courseData', async (req, res) => {
    const { course, lastDate, duration, image, campus } = req.body;

    try {
        if (!course || !lastDate || !duration || !image || !campus) {
            return res.status(400).json({
                message: 'Some fields are missing!',
                description: 'Please check all the fields.',
            });
        }

        const existingCourse = await Course.findOne({ course });
        if (existingCourse) {
            return res.status(409).json({
                message: 'Course already exists!',
                description: 'A course with the same name already exists.',
            });
        }

        const newCourse = new Course({ course, lastDate, duration, image, campus });
        await newCourse.save();

        res.status(201).json({
            isSuccessfully: true,
            message: 'Course data has been saved successfully!',
            data: newCourse,
        });
    } catch (error) {
        console.error('Error saving course data:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
});

courseRoute.get('/courseData', async (req, res) => {
    try {
        const courses = await Course.find(); 
        res.status(200).json({
            isSuccessfully: true,
            message: 'Course data retrieved successfully!',
            data: courses,
        });
    } catch (error) {
        console.error('Error retrieving course data:', error);
        res.status(500).json({
            isSuccessfully: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
});

module.exports = courseRoute;
