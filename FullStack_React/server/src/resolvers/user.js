//obj : parent 객체 / args : 쿼리에 필요한 필드에 제공되는 인수 / context : 로그인한 사용자 정보
const userResolver = {
    Query: {
        users: (parent, args, { db }) => {
            return Object.values(db.users)
        },
        user: (parent, { id }, { db }) => {
            return db.users[id]
        }
    }
}



export default userResolver