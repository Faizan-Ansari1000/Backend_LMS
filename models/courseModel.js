const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true
  },
  lastDate: {
    type: String, 
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  image: {
    type: String, 
    required: true
  },
  campus: {
    type: String,
    required: true
  }
}, { timestamps: true }); 


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
