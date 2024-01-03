import { createChat } from '@/consumer'
import { useAuth } from '@/useAuth'
import { useRouter } from 'next/navigation'
import { FaUserCircle } from 'react-icons/fa'

export default function UserContainer({data}) {

    const {token, user} = useAuth()
    const router = useRouter()

    const handleClick = async (e) => {
        const chat = await createChat(token, [user.username, data.username])
        if (chat){
            router.push(`/${chat.id}`)
        }
    }

    return (
        <div className='flex justify-start gap-2 items-center mb-3 cursor-pointer' onClick={handleClick}>
            <div>
                <FaUserCircle className='h-12 w-12' />
            </div>
            <div>
                <p className='font-bold'>{data.username}</p>
            </div>
        </div>
    )
}