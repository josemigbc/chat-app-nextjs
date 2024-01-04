"use client";
import { getUsers } from "@/consumer";
import Header from "./Header";
import { useAuth } from "@/useAuth";
import { useEffect, useState } from "react";
import UserContainer from "./UserContainer";

export default function Page() {

    const { token } = useAuth()
    const [users, setUsers] = useState(null)

    useEffect(() => {
        const load = async () => {
            if (token) {
                const data = await getUsers(token);
                setUsers(data);
            }
        }
        load();
    }, [token])

    return (
        <>
            <Header />
            <main className="p-2">
                <div className="flex flex-col gap-2">
                    {!users ? <p className="text-lg text-center">Loading...</p> : users.map(user => (
                        <UserContainer key={user.id} data={user}/>
                    )) }
                </div>
            </main>
        </>
    )
}