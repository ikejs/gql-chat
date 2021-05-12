const { Channel, User } = require('../models');

module.exports = {
  user(_, { _id }) {
    return User.findOne({ _id });
  },
  channels() {
    return Channel.find();
  },
  channel(_, { _id }) {
    return Channel.findById(_id);
  },
};
