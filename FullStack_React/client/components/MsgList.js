import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";
import { useEffect, useState, useRef } from "react";
import fetcher from '../fetcher'
import { useRouter } from 'next/router'
import useInfiniteScroll from "../hooks/useInfiniteScroll";


const MsgList = ({ smsgs, users }) => {
    const { query } = useRouter()
    const userId = query.userId || query.userid || ''
    const [msgs, setMsgs] = useState(smsgs)
    const [editingId, setEditingId] = useState(null)
    const fetchMoreEl = useRef(null)
    const interseting = useInfiniteScroll(fetchMoreEl)
    const [hasNext, setHasNext] = useState(true)

    const onCreate = async text => {
        const newMsg = await fetcher('post', '/messages', { text, userId })
        if (!newMsg) throw Error('Someting wrong')
        setMsgs(msgs => ([newMsg, ...msgs]))
    }

    const onUpdate = async (text, id) => {
        const newMsg = await fetcher('put', `/messages/${id}`, { text, userId })
        if (!newMsg) throw Error('Someting wrong')
        setMsgs(msgs => {
            const targetIndex = msgs.findIndex(msg => msg.id === id)
            if (targetIndex < 0) return msgs
            const newMsgs = [...msgs]
            newMsgs.splice(targetIndex, 1, newMsg)
            return newMsgs
        })
        doneEdit()
    }

    const doneEdit = () => setEditingId(null)


    const onDelete = async id => {
        const receviedId = await fetcher('delete', `/messages/${id}`, { params: { userId } })
        setMsgs(msgs => {
            const targetIndex = msgs.findIndex(msg => msg.id === receviedId + '')
            if (targetIndex < 0) return msgs
            const newMsgs = [...msgs]
            newMsgs.splice(targetIndex, 1)
            return newMsgs
        })
    }

    const getMessages = async () => {
        const newMsgs = await fetcher('get', '/messages', { params: { cursor: msgs[msgs.length - 1]?.id || '' } })
        if (newMsgs.length === 0) {
            setHasNext(false)
            return
        }
        setMsgs(msgs => [...msgs, ...newMsgs])
    }

    useEffect(() => {
        if (interseting && hasNext) getMessages()
    }, [interseting])

    return (
        <>
            {userId && <MsgInput mutate={onCreate} />}
            <ul className="messages">
                {
                    msgs.map(x =>
                        <MsgItem key={x.id} {...x}
                            onUpdate={onUpdate}
                            onDelete={() => onDelete(x.id)}
                            startEdit={() => setEditingId(x.id)}
                            isEditing={editingId === x.id}
                            myId={userId}
                            user={users[x.userId]}
                        />
                    )
                }

            </ul>
            <div ref={fetchMoreEl} />
        </>
    )
}

export default MsgList;