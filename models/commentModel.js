const mongoose = require('mongoose');
const validator = require('validator');

const commentSchema = new mongoose.Schema({

  courseId: {
    type: String,
    trim: true,
    required: true
  },
  userId: {
    type: String,
    trim: true,
    required: true
  },
  comment: {
    type: String,
    default: ""
  },
  like: {
    type: Boolean,
    default: false,
    select: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  edited: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

// const mongoose = require('mongoose');
// const validator = require('validator');
// var CommentSchema = new Schema({
// });
// mongoose.model('Comment', CommentSchema);
