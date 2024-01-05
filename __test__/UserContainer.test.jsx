import UserContainer from "@/app/new/UserContainer"
import {describe, expect, test} from "@jest/globals"
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { createTestOneChat } from "./dataTest"
import { createChat } from "../consumer"
import { useRouter } from "next/router"

const pushMock = jest.fn()

jest.mock("next/navigation", () => {
    return {
        useRouter: () => {
            return {
                push: pushMock,
            }
        }
    }
})

jest.mock("../consumer", () => {
    const originalModule = jest.requireActual("../consumer");
    return {
        __esModule: true,
        ...originalModule,
        createChat: jest.fn(async (access_token, userArray) => access_token === "tokenTest" ? createTestOneChat() : null),
    }
})

describe("UserContainer", () => {
    test("UserContainer rendering", ()=> {
        render(<UserContainer data={{username: "test"}}/>)
        expect(screen.getByText("test")).toBeInTheDocument()
    })
    
    test("Redirect to chat after click",async () => {
        localStorage.setItem("access_token", "tokenTest")
        localStorage.setItem("user", JSON.stringify({ "id": 1, "username": "test1" }))
        render(<UserContainer data={{username: "test"}}/>)
        const userContainer = screen.getByText("test")
        await fireEvent.click(userContainer)
        expect(createChat).toHaveBeenCalled()
        expect(pushMock).toHaveBeenCalled()
    })
})