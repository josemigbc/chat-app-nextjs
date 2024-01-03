import { useAuth } from "@/useAuth"

export default function WebSocketComponent({setChats, children}){
    
    const { token } = useAuth()
    const { lastJsonMessage } = useWebSocket(`ws://127.0.0.1:8000?token=${token}`)
    
    // Effect to resort chats array when a new message is received. 
    useEffect(() => {
        if (lastJsonMessage) {
            // Drop chat from array and added in the start
            setChats(prevChats => {
                const chat = prevChats.filter(ch => ch.id === lastJsonMessage.chat_id)[0]
                const i = prevChats.indexOf(chat)
                chat.last_message = lastJsonMessage
                prevChats.splice(i, 1);
                return [chat, ...prevChats]
            })
        }
    }, [lastJsonMessage, chats])
    
    return <>{children}</> 
}