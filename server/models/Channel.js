const { Schema, model } = require('mongoose');

const schema = new Schema({ 
  name: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
}, { timestamps: true });

module.exports = model('Channel', schema);