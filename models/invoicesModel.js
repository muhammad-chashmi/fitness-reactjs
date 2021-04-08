'use strict';

var mongoose = require('mongoose'),

/**
 * Invoices Schema
 */
const invoicesSchema = new mongoose.Schema({

  user_fullname: {
    type: String,
    trim: true,
    required: true
  },
  userId: {
    type: String,
    trim: true,
    required: true
  },
  factorId: {
    type: String,
    trim: true,
    required: true
  },
  plan: {
    type: String,
    trim: true,
    default: "FREE",
    required: true
  },
  planPrice: {
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
  startAt: {
    type: Date,
    default: Date.now
  },
  expireAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  payedAt: {
    type: Date,
    default: Date.now
  },
  RefId: {
    type: String,
    trim: true,
    default: ""
  },
  PayedPrice: {
    type: String,
    trim: true,
    default: "0",
    required: true
  },
});

const Invoices = mongoose.model('Invoices', invoicesSchema);
module.exports = Invoices;