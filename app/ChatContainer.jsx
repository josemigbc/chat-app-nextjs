import { useAuth } from '@/useAuth'
import { FaUserCircle } from 'react-icons/fa'

export default function ChatContainer({data}) {

    const { user } = useAuth()
    const text = data.last_message ? data.last_message.text: ''
    const userTo = data.users.filter(u => u.id != user?.id)[0].username

    return (
        <div className='flex justify-start gap-2 items-center mb-3'>
            <div>
                <FaUserCircle className='h-12 w-12' />
            </div>
            <div className='flex flex-col justify-between items-start'>
                <p className='font-bold'>{userTo}</p>
                <p className='text-sm'>{text}</p>
            </div>
        </div>
    )
}