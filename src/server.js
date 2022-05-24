import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import queryParser from './utils/queryParser.js'
import express from 'express'
import http from 'http'
    import path from 'path'

    import './config.js'

import schema from './modules/index.js'

!async function (typeDefs, resolvers) {
    const app = express()
    const httpServer = http.createServer(app)

    app.use(express.static(path.join(process.cwd(), 'uploads')))

    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        context: ({ req }) => {
            const { operation, fieldName } = queryParser(req.body)
            const TOKEN = req.headers?.token?.trim()

            if (fieldName === '__schema') return

            if (['login', 'register', 'vidoes', 'users'].includes(fieldName)) {
                return {
                    agent: req.headers['user-agent'],
                }
            }

            if (!TOKEN) {
                throw new Error("Token is required!")
            }

            const { userId, agent } = JWT.verify(TOKEN)

            if (req.headers['user-agent'].trim() !== agent.trim()) {
                throw new Error("Wrong device!")
            }

            return {
                userId,
                agent: req.headers['user-agent'],
            }

        },
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
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

/*
    query
        users(userId: Int pagination sort): [Video]    [public]  
        videos(videoId: Int search): [Video]           [public]
        adminVideos(): [Video]                         [private]

    mutation
        login          [public]
        register       [public]
        addVideo       [private]
        changeVideo    [private]
        deleteVideo    [private]
*/
