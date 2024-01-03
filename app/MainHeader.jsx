export default function MainHeader() {
    return (
        <header className="flex flex-col justify-between w-full fixed top-0 left-0 h-16 shadow-md bg-slate-200 px-3">
            <div>
                <h1 className="text-lg">ChatApps</h1>
            </div>
            <div>
                <h2 className="text-md">Chats</h2>
            </div>
        </header>
    )
}