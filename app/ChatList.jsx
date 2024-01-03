import ChatContainer from "./ChatContainer";
import Link from "next/link"

export default function ChatList({ data }) {
    
    if (data.length === 0) {
        return (
            <div className="px-3">
                <p className=" text-lg text-center">There are not any chats.</p>
            </div>
        )
    }

    return (
        <div className="px-3">
            {data.map(chat => {
                return <Link key={chat.id} href={`/${chat.id}`}><ChatContainer data={chat} /></Link>
            })}
        </div>
    )
}