const { Schema, model } = require('mongoose');

const schema = new Schema({ 
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
}, { timestamps: true });

module.exports = model('Post', schema);