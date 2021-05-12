const { Channel } = require("../models");

module.exports = {
  addChannel: (_, { name }, { pubsub }) => {
    const channel = new Channel({ name })
    channel.save((err, result) => {
      if (err) throw new Error(err);
      pubsub.publish('NEW_POST', { newChannel: result });
      return result;
    });
    return Channel.find(); // return list of channels
  },
};
