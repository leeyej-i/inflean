import express from 'express'
import cors from 'cors'
import messagesRoute from './routes/messages.js'
import { ApolloServer } from 'apollo-server-express'
import usersRoute from './routes/users.js'
import { SchemaMetaFieldDef } from 'graphql'
import resolvers from './resolvers/index.js'
import schema from './schema/index.js'
import { readDB } from './dbController.js'

// REST API 방식
// const app = express()

// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         credentials: true,
//     }),
// )

// REST API -> 라우트를 이용해서 각 라우트에 따라서 response를 주는 형식
// const routes = [...messagesRoute, ...usersRoute]
// routes.forEach(({ method, route, handler }) => {
//      app[method](route, handler)
// })

// app.listen(8000, () => {
//     console.log('server listening on 8000...')
// })



// 아폴로서버 이용방식
const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
        db: {
            messages: readDB('messages'),
            users: readDB('users'),
        },
    },
})

const app = express()
await server.start()
server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        credentials: true,
    },
})

await app.listen({ port: 8000 })
console.log('server listening on 8000...')