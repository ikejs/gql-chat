module.exports = {
  author: async (post) => {
    return (await post.populate('author').execPopulate()).author
  },
};
