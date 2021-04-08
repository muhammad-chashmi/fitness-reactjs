
const mongoose = require('mongoose');
const validator = require('validator');

 const CategorySchema = new mongoose.Schema({

   title: {
    type: String,
    required: true
  },
   uniqueTitle: {
    type: String,
    trim: true,
    required: true,
    unique:true
  },
  pictureURL: {
    type: String,
    trim: true,
    default: ""
  },
  iconURL: {
    type: String,
    trim: true,
    default: ""
  },
  color: {
    type: String,
    trim: true,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  order: {
    type: Number,
    required: true,
    default: 0
  },
  metaKeyWord: {
    type: String,
    default: ""
  },
  MetaDescription: {
    type: String,
    default: ""
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

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;