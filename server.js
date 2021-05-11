const { ApolloServer, gql, PubSub } = require('apollo-server');
const pubsub = new PubSub();

// fake db
const data = [
	{ message: 'hello world', date: new Date() },
];
const users = [
  { id: "abc001", name: "Ike H" },
  { id: "abc002", name: "Bill S" },
]


const typeDefs = gql`
  type User {
    id: String!,
    name: String!,
  },

	type Post {
		message: String!
		date: String!
	},

	type Query {
		posts: [Post!]!
    user(id: String!): User!
	},

	type Mutation {
		addPost(message: String!): Post!
	},

	type Subscription {
		newPost: Post!
	},
`;


const resolvers = {
	Query: {
		user(parent, args, context, info) {
			return users.find(user => user.id === args.id);
		},
    posts() {
      console.log(data[0].message)
      return data;
    },
	},
	Mutation: {
		addPost: (_, { message }) => {
			const post = { message, date: new Date() };
			data.push(post);
			pubsub.publish('NEW_POST', { newPost: post });
			return post;
		},
	},
	Subscription: {
		newPost: {
			subscribe: () => pubsub.asyncIterator('NEW_POST'),
		},
	},
};


const server = new ApolloServer({ 
	typeDefs, 
	resolvers 
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
