const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

require('dotenv').config()

const Post = require('./api/models/Post')

const typeDefs = gql`
scalar Date

    type Post {
        id: ID!
        body: String!
        createdAt: Date
        username: String!
    },
    type Query {
        getPosts: [Post]
    }
`

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            }
            catch (error) {
                throw new Error(error)
            }
        }
    }
}

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

