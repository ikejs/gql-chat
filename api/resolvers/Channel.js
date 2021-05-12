module.exports = {
  name({ name }) {
    return name;
  },
  posts: async (parent) => {
    return (await parent.populate('posts').execPopulate()).posts
  },
};
