const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppConstants = require('./../../settings/constants');

let ImagesSchema = new Schema ({
  author: {
      type: Schema.ObjectId,
      intex: true,
      ref: 'users'
    },
    image: { // TODO: renamed to image from images
      type: Buffer,
      default: null,
      },
    content_type:{
      type: String,
      },
    createAt: {
      type: Date,
      default: Date.now,
      index: true
    },
    size: {
      type: Number
    },
    width: {
      type: Number
    },
    height: { // renamed to height
      type: Number
    },
    title:{
      type: String
    },
});

module.exports = mongoose.model('images', ImagesSchema);
