'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Plan Schema
 */
const planSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  uniqueTitle: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  type: {
    type: String,
    enum: ['FREE', 'MONTHLY', 'SIXMONTH', 'ANNUALY'],
    default: 'FREE',
    required: true,
    trim: true
  },
  price: {
    type: String,
    trim: true,
    default: "0",
    required: true
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
  },
  order: {
    type: Number,
    required: true,
    default: 0
  },
  popular: {
    type: Boolean,
    default: false,
    select: true
},
});

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;