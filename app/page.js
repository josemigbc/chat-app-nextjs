"use client";
import ChatList from "./ChatList";
import MainHeader from "./MainHeader";
import { useAuth } from "@/useAuth";
import { useEffect, useState } from "react";
import useWebSocket from 'react-use-websocket'
import { getChats } from "@/consumer";

export default function Home() {

  const { token } = useAuth()
  const [chats, setChats] = useState(null)
  const { lastJsonMessage } = useWebSocket(`ws://127.0.0.1:8000?token=${token}`)

  //Effect to fetch the chats.
  useEffect(() => {
    const load = async () => {
      if (token) {
        let chatsData = await getChats(token)
        chatsData = chatsData.filter(chat => chat.last_message)
        setChats(chatsData.sort((chatA, chatB) => new Date(chatB.last_message.utcDate) - new Date(chatA.last_message.utcDate)))
      }
    }
    load()
  }, [token])

  // Effect to resort chats array when a new message is received. 
  useEffect(() => {
    if (lastJsonMessage) {
      const chat = chats.filter(ch => ch.id === lastJsonMessage.chat_id)[0] //Get the chat by chat_id
      const i = chats.indexOf(chat)
      chat.last_message = lastJsonMessage
      // Drop chat from array and added in the start
      setChats(prevChats => {
        prevChats.splice(i, 1);
        return [chat, ...prevChats]
      })
    }
  }, [lastJsonMessage, chats])

  return (
    <>
      <MainHeader />
      <main>
        {!chats ? <p className="text-lg text-center">Loading...</p> : <ChatList data={chats} />}
      </main>
    </>
  )
}
