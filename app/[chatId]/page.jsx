"use client";
import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader"
import Message from "./Message"
import MessageForm from "./MessageForm"
import { useAuth } from "@/useAuth";
import useWebSocket from "react-use-websocket";
import { getChat } from "@/consumer";
import {notFound} from 'next/navigation'

export default function Page({ params }) {

    const [chat, setChat] = useState(null)
    const [userTo, setUserTo] = useState(null)
    const { user, token } = useAuth()
    const { lastJsonMessage, sendJsonMessage } = useWebSocket(`ws://127.0.0.1:8000?token=${token}`)

    const appendMessage = (message) => {
        setChat(prevChat => ({
            ...prevChat,
            messages: [...prevChat.messages, message]
        }))
    }

    //Effect to render the new coming message if it belongs the chat.
    useEffect(() => {
        if (lastJsonMessage && lastJsonMessage.chat_id == params.chatId) {
            appendMessage(lastJsonMessage);
        }
    }, [lastJsonMessage, params.chatId])

    //Effect to fetch the messages
    useEffect(() => {
        const load = async () => {
            if (token) {
                const chatData = await getChat(params.chatId, token)
                const _user = chatData?.users.filter(u => u.id !== user.id)[0].username
                setChat(chatData);
                setUserTo(_user)
            }
        }
        load();
    }, [params.chatId, user, token])

    //Effect to set the scroll in the chat's last_message.
    useEffect(() => {
        window && window.scrollTo(0, document.body.scrollHeight)
    }, [chat])

    if (chat === undefined){
        notFound()
    }

    return (
        <>
            <ChatHeader userTo={userTo} />
            <main className="p-2">
                <div className="flex flex-col gap-2">
                    {!chat ? <p className="text-lg text-center">Loading...</p> : chat.messages.map((msg, i) => <Message key={i} data={msg} userTo={userTo} />)}
                </div>
                <MessageForm user={user} chat_id={params.chatId} appendMessage={appendMessage} sendJson={sendJsonMessage} />
            </main>
        </>
    )
}