"use client";
import { useState } from "react";
import FieldList from "./FieldList";
import { useRouter } from "next/navigation";
import { login, register, getUser } from "@/consumer";

export default function Form() {

    const [isLogin, setIsLogin] = useState(true)
    const router = useRouter()

    const formDataToJSON = (formData) => {
        const data = {};
        formData.forEach((value, name) => {
            data[name] = value
        })
        return data
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target)
        const data = formDataToJSON(formData)

        if (isLogin) {
            const response_data = await login(data)
            
            if (response_data) {
                const { access_token } = response_data
                localStorage.setItem('access_token', access_token)
                await getUser(access_token)
                router.push("/")
            } else {
                alert("Incorrect");
            }
        } else {
            if (data.password !== data.password2) {
                alert("The passwords do not match.")
                return
            }
            const response_data = await register(data)
            
            if (response_data) {
                alert("Created.")
                setIsLogin(true)
            } else {
                alert("Incorrect");
            }
        }
    }

    return (
        <form className="shadow-md px-3 py-3" onSubmit={handleSubmit}>
            <FieldList isLogin={isLogin} setIsLogin={setIsLogin} />
        </form>
    )
}