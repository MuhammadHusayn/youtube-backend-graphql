import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import http from 'http'
import './config.js'

import schema from './modules/index.js'

!async function (typeDefs, resolvers) {
    const app = express()
    const httpServer = http.createServer(app)

    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer })
        ],
    })

    await server.start()
    server.applyMiddleware({
        app,
        path: '/',
    })

    await new Promise(resolve => httpServer.listen({ port: process.env.PORT }, resolve))
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
}()