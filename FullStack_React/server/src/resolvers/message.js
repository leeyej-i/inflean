import { writeDB } from "../dbController.js"
import { v4 } from 'uuid'

const setMsgs = (data) => writeDB('messages', data)
//obj : parent 객체 / args : 쿼리에 필요한 필드에 제공되는 인수 / context : 로그인한 사용자 정보
const messageResolver = {
    Query: {
        messages: (parent, args, { db }) => {
            // console.log({ parent, args, context })
            return db.messages
        },
        message: (parent, { id = '' }, { db }) => {
            return db.messages.find(msg => msg.id === id)
        }
    },

    Mutation: {
        createMessage: (parent, { text, userId }, { db }) => {
            const newMsg = {
                id: v4(),
                text,
                userId,
                timestamp: Date.now()
            }
            db.messages.unshift(newMsg)
            setMsgs(db.messages)
            return newMsg
        },
        updateMessage: (parent, { id, text, userId }, { db }) => {
            const targetIndex = db.messages.findIndex(msg => msg.id === id)
            if (targetIndex < 0) throw Error('메시지가 없습니다.')
            if (db.messages[targetIndex].userId !== userId) throw Error('사용자가 다릅니다.')

            const newMsg = { ...db.messages[targetIndex], text: text }
            db.messages.splice(targetIndex, 1, newMsg)
            setMsgs(db.messages)
            return newMsg
        },
        deleteMessage: (parent, { id, userId }, { db }) => {
            const targetIndex = db.messages.findIndex(msg => msg.id === id)
            if (targetIndex < 0) throw Error('메시지가 없습니다.')
            if (db.messages[targetIndex].userId !== userId) throw Error('사용자가 다릅니다.')

            db.messages.splice(targetIndex, 1)
            setMsgs(db.messages)
            return id
        },
    }
}



export default messageResolver