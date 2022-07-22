import { readDB } from "../dbController.js"
import { v4 } from 'uuid'

const getUsers = () => readDB('users')

const usersRoute = [
    { // Get
        method: 'get',
        route: '/users',
        handler: (req, res) => {
            const users = getUsers()
            res.send(users)
        }
    },
    { // Get
        method: 'get',
        route: '/users/:id',
        handler: ({ params: { id } }, res) => {
            try {
                const users = getUsers()
                const user = users[id]
                if (!user) throw Error('사용자가 없습니다.')
                res.send(user)
            } catch (err) {
                res.status(404).send({ error: err })
            }

        },
    }
]

export default usersRoute;