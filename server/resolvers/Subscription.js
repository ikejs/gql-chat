module.exports = {
  newPost: {
    subscribe: () => pubsub.asyncIterator('NEW_POST'),
  },
};
