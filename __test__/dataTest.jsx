export const createTestUser = (n) => {
    const users = []
    for (let i = 0; i < n; i++){
        users.push({
            id: i+1,
            username: `test${i+1}`
        })
    }
    return users
}

export const createTestMessage = (n, textMessage="test message") => {
    const messages = []
    for (let i = 0; i < n; i++){
        messages.push({
            id: i,
            user: {
                id: i % 2 + 1,
                username: `test${i % 2 + 1}`,
            },
            text: textMessage,
            utcDate: new Date().toISOString()
        })
    }
    return messages
}

export const createTestChat = (n) => {
    const chats = []
    for (let i = 0; i < n; i++) {
        chats.push({
            id: i,
            users: createTestUser(2),
            last_message: {...createTestMessage(1)[0], chat_id: i}
        })
    }
    return chats
}

export const createTestOneChat = (id=1) => ({
    id: id,
    users: createTestUser(2),
    messages: createTestMessage(5).map(msg => ({...msg, chat_id: 1}))
})