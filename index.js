const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config()

const typeDefs = require('./api/graphql/typeDefs')
const resolvers = require('./api/graphql/resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(process.env.connectionString_MONGO, { useNewUrlParser: true }).then(() => {
    console.log('Mongo connected');

    return server.listen({port: 5000}).then((result) => {
        console.log(`Server running at ${result.url}`)
    }).catch(error => {
        console.log(error);
    })
})
.catch(error => {
    console.log(error);
});

