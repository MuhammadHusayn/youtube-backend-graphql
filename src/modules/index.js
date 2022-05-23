import { makeExecutableSchema } from '@graphql-tools/schema'

import UserModule from './user/index.js'

export default makeExecutableSchema({
    typeDefs: [
        UserModule.typeDefs,
    ],

    resolvers: [
        UserModule.resolvers,
    ],
})