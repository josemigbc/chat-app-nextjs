import { FaUserCircle } from "react-icons/fa"

export default function ChatHeader({userTo}) {
    return (
        <header className="px-3 py-1 fixed top-0 left-0 bg-slate-200 w-screen">
            <div className='flex justify-start gap-2 items-center'>
                <FaUserCircle className='h-12 w-12' />
                <p className='font-bold'>{userTo}</p>
            </div>
        </header>
    )
}