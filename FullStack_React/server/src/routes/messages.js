import { readDB, writeDB } from "../dbController.js"
import { v4 } from 'uuid'

const getMsgs = () => readDB('messages')
const setMsgs = (data) => writeDB('messages', data)
const messagesRoute = [
    { // Get
        method: 'get',
        route: '/messages',
        handler: (req, res) => {
            const msgs = getMsgs()
            res.send(msgs)
        }
    },
    { // Get
        method: 'get',
        route: '/messages/:id',
        handler: ({ params: { id } }, res) => {
            try {
                const msgs = getMsgs()
                const msg = msgs.find(m => m.id === id)
                if (!msg) throw Error('not found')
                res.send(msg)
            } catch (err) {
                res.status(404).send({ error: err })
            }

        },
    },
    { // Create
        method: 'post',
        route: '/messages',
        handler: ({ body }, res) => {
            const msgs = getMsgs()
            const newMsg = {
                id: v4(),
                text: body.text,
                userid: body.userid,
                timestamp: Date.now()
            }
            msgs.unshift(newMsg)
            setMsgs(msgs)
            res.send(newMsg)
        }
    },
    { // Update
        method: 'put',
        route: '/messages/:id',
        handler: ({ body, params: { id } }, res) => {
            try {
                const msgs = getMsgs()
                const targetIndex = msgs.findIndex(msg => msg.id === id)
                if (targetIndex < 0) throw '메시지가 없습니다.'
                if (msgs[targetIndex].userid !== body.userid) throw '사용자가 다릅니다.'

                const newMsg = { ...msgs[targetIndex], text: body.text }
                msgs.splice(targetIndex, 1, newMsg)
                setMsgs(msgs)
                res.send(newMsg)
            } catch (err) {
                res.status(500).send({ error: err })
            }

        },
    },
    { // Delete
        method: 'delete',
        route: '/messages/:id',
        handler: ({ body, params: { id } }, res) => {
            try {
                const msgs = getMsgs()
                const targetIndex = msgs.findIndex(msg => msg.id === id)
                if (targetIndex < 0) throw '메시지가 없습니다.'
                if (msgs[targetIndex].userid !== body.userid) throw '사용자가 다릅니다.'

                msgs.splice(targetIndex, 1)
                setMsgs(msgs)
                res.send(id)
            } catch (err) {
                res.status(500).send({ error: err })
            }

        },
    }
]

export default messagesRoute;