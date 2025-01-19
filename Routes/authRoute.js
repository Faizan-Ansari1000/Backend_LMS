const express = require('express');
require('dotenv').config();
const User = require('../models/userModel');
const bcrypt = require('bcrypt'); 

const Route = express.Router(); 

Route.use(express.json());

// signUp API
Route.post('/signUp', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, Email, and Password are required!' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'user', 
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login API
Route.post('/Login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required!' });
        }

        const adminEmail = 'SMIT900@gmail.com';  
        const adminPassword = 'SMIT900';  


        if (email === adminEmail && password === adminPassword) {
            return res.status(200).json({
                user: { role: 'admin' },
                isSuccessfull: true,
                message: 'Welcome Admin!',
                portal: 'Admin Portal',
            });
        }

        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        
        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return res.status(401).json({ message: 'Invalid password!' });
        }

        
        return res.status(200).json({
            user: { role: user.role },
            isSuccessfull: true,
            message: `Welcome ${user.role === 'admin' ? 'Admin' : 'User'}!`,
            portal: user.role === 'admin' ? 'Admin Portal' : 'User Portal',
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



module.exports = Route;
