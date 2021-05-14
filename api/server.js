const { ApolloServer, gql, PubSub } = require('apollo-server');
// const express = require('express');
// const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware');
const pubsub = new PubSub();
const resolvers = require('./resolvers');
const { db } = require('./config');
const { typeDefs } = require('./models');

// const port = process.env.PORT || 5000
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()

// const paths = {
// 	'/api': {
// 			target: 'http://localhost:3000', 
// 			pathRewrite: {
// 					'^/api': '/api'
// 			},
// 			changeOrigin: true
// 	}
// }

// const isDevelopment = process.env.NODE_ENV !== 'production'

const apolloServer = new ApolloServer({ 
	typeDefs, 
	resolvers,
  context: { pubsub }
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('db connected ✅');
});

apolloServer
	.listen()
	.then(({ url }) => {
		// app.prepare().then(() => {
			// const server = express()
		
			// if (isDevelopment) {
			// 	server.use('/api', createProxyMiddleware(paths['/api']));
			// }
		
			// server.all('*', (req, res) => {
			// 	return handle(req, res)
			// })
		
			// server.listen(port, (err) => {
			// 	if (err) throw err
			// 	console.log(`> Ready on http://localhost:${port}`)
			// })
		// }).catch(err => {
		// 		console.log('Error:::::', err)
		// });
		console.log(`🚀 Apollo ready at ${url}`);
});
