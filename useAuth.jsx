"use client";

import { useEffect, useState } from "react";

export const useAuth = () => {
    const [token, setToken] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        setToken(localStorage.getItem('access_token'));
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    return { user, token }
}