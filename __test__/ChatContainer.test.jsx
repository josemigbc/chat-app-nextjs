import ChatContainer from "@/app/ChatContainer"
import {describe, expect, test} from "@jest/globals"
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { createTestChat } from "./dataTest"

describe("Chat Container", () => {
    test("Render Chat Container", ()=> {
        localStorage.setItem('user',JSON.stringify({id:1}))
        render(<ChatContainer data={ createTestChat(1)[0] }/>)
        expect(screen.getByText("test message")).toBeInTheDocument()
        expect(screen.getByText("test2")).toBeInTheDocument()
    })
    test("Render Chat Container without last_message.", ()=>{
        localStorage.setItem('user',JSON.stringify({id:1}))
        const chatTest = createTestChat(1)[0]
        chatTest.last_message = null
        render(<ChatContainer data={chatTest}/>)
        expect(screen.getByText("test2")).toBeInTheDocument()
    })
})