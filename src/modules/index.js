import { makeExecutableSchema } from '@graphql-tools/schema'

import UserModule from './user/index.js'
import VideoModule from './user/index.js'

export default makeExecutableSchema({
    typeDefs: [
        UserModule.typeDefs,
        VideoModule.typeDefs,
    ],

    resolvers: [
        UserModule.resolvers,
        VideoModule.resolvers,
    ],
})