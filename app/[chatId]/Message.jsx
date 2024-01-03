export default function Message({ data, userTo }) {
    if (data.user.username !== userTo) {
        return (
            <div className="flex justify-end py-1 px-2">
                <div className="flex justify-end bg-blue-400 shadow-sm py-1 px-2 rounded-md items-end gap-3">
                    <p>{data.text}</p>
                    <p className="text-xs font-light">{new Date(data.utcDate).toLocaleTimeString()}</p>
                </div>
            </div>
        )
    }
    return (
        <div className="flex justify-start">
            <div className="flex justify-end bg-blue-400 shadow-sm py-1 px-2 rounded-md items-end gap-3">
                <p>{data.text}</p>
                <p className="text-xs font-light">{new Date(data.utcDate).toLocaleTimeString()}</p>
            </div>
        </div>
    )
}