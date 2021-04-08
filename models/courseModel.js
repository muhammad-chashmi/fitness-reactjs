'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Course Schema
 */
const courseSchema = new Schema({
    
  name: {
    type: String,
    trim: true,
    required: true
  },
  uniqueTitle: {
    type: String,
    trim: true,
    required: true,
    unique:true
  },
  coachId: {
    type: String,
    trim: true,
    required: true
  },
  categoryId: {
    type: String,
    trim: true,
    required: true
  },
  level: {
    type: String,
    enum: ['INTRO', 'ADVANCED', 'ALLLEVELS'],
    default: 'INTRO'
},
perviewAudioFileURL: {
  type: String,
  default: "",
},
AudioFileURL: {
  type: String,
  default: "",
},
PerviewVideoFileURL: {
  type: String,
  default: "",
},
VideoFileURL: {
  type: String,
  default: "",
},
time: {
  type: String,
  default: "",
},
calories: {
  type: String,
  default: "",
},
target: {
  type: String,
  default: "",
},
sweat: {
  type: String,
  enum: ['NO', 'LOW', 'MEDIUM', 'HARD'],
  default: 'NO'
},
equipmentsList: {
  type: String,
  enum: ['NO', 'TREADMELL', 'DUMBBELL', 'MAT'],
  default: 'NO'
},
brief: {
  type: String,
  default: "",
},
description: {
  type: String,
  default: "",
},
equipments: {
  type: String,
  default: "",
},
free: {
  type: Boolean,
  default: true,
  select: false
},
  created: {
    type: Date,
    default: Date.now
  },
  edited: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true,
    select: false
}
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;