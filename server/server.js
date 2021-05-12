const { ApolloServer, gql, PubSub } = require('apollo-server');
const pubsub = new PubSub();
const resolvers = require('./resolvers');
const { db } = require('./config');
const { typeDefs } = require('./models');

const server = new ApolloServer({ 
	typeDefs, 
	resolvers,
  context: { pubsub }
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('db connected ✅');
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
