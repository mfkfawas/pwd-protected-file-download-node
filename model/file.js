const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  password: String,
  downloadCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('file', FileSchema);
