"use client";
import { useState } from 'react';
import { FaArrowCircleRight, } from 'react-icons/fa'

export default function MessageForm({ user, chat_id, appendMessage, sendJson }) {

    const [textMessage, setTextMessage] = useState('')

    return (
        <form className="fixed bottom-0 left-0 px-1 py-3 w-full"
            onSubmit={(event) => {
                event.preventDefault();
                sendJson({
                    type: "message",
                    chat_id: chat_id,
                    text: textMessage
                })

                const msg = {
                    user: user,
                    text: textMessage,
                    utcDate: new Date().toISOString()
                }
                appendMessage(msg);
                setTextMessage('');
            }}
        >
            <div className="flex justify-between items-center">
                <input name="text" className="bg-slate-100 shadow-md px-2 py-1 rounded-lg outline-none" placeholder="Message..."
                    onChange={(e) => { setTextMessage(e.target.value) }}
                    value={textMessage}
                />
                <button>
                    <FaArrowCircleRight className="h-8 w-8 text-blue-400" />
                </button>
            </div>
        </form>
    )
}