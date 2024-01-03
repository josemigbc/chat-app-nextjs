import axios from "axios"

export const login = async (data) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/login', data)
        return response.data
    } catch (err) {
        console.error(err);
    }

}

export const register = async (data) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/user', data)
        return response.data
    } catch (err) {
        console.error(err);
    }
}

export const getUser = async (token) => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/user", {
            headers: { "Authorization": `Bearer ${token}` }
        })
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    } catch (err) {
        console.error(err);
    }

}

export const getChats = async (token) => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/chats", {
            headers: { "Authorization": `Bearer ${token}` }
        })
        return response.data
    } catch (err) {
        console.error(err);
    }
}

export const getChat = async (id, token) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/chats/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        return response.data
    } catch (err) {
        console.error(err);
    }
}