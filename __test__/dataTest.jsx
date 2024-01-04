export const createTestChat = (n) => {
    const chats = []
    for (let i = 0; i < n; i++) {
        chats.push({
            id: i,
            users: [
                {
                    id: 1,
                    username: "test1"
                },
                {
                    id: i + 2,
                    username: `test${i+2}`
                }
            ],
            last_message: {
                text: "Test message"
            }
        })
    }
    return chats
}

export const createTestMessage = (n) => {
    const messages = []
    for (let i = 0; i < n; i++){
        messages.push({
            id: i,
            user: {
                id: i % 2 + 1,
                username: `test${i % 2 + 1}`,
            },
            text: "test message",
            utcDate: new Date().toISOString()
        })
    }
    return messages
}