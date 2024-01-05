import '@testing-library/jest-dom'
import { describe, expect, test } from "@jest/globals"
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import Home from '@/app/page'
import { default as PageChatId } from "@/app/[chatId]/page"
import { createTestChat, createTestMessage, createTestOneChat } from './dataTest'
import {notFound} from "next/navigation"

jest.mock("next/navigation")

jest.mock('react-use-websocket', () => {
    const originalModule = jest.requireActual('react-use-websocket');
    return {
        __esModule: true,
        ...originalModule,
        default: jest.fn(() => {
            return {
                lastJsonMessage: {
                    ...createTestMessage(1,"testWS")[0],
                    chat_id: 1,
                },
                sendJsonMessage: jest.fn()
            }
        }),
    }
})

jest.mock("../consumer", () => {
    const originalModule = jest.requireActual("../consumer");
    return {
        __esModule: true,
        ...originalModule,
        getChats: jest.fn(async (access_token) => access_token === "tokenTest" ? createTestChat(5) : null),
        getChat: jest.fn(async (id, access_token) => access_token === "tokenTest" ? createTestOneChat() : undefined),
    }
})

describe("Home page only", () => {

    test("New coming message", async () => {
        localStorage.setItem("access_token", "tokenTest")
        localStorage.setItem("user", JSON.stringify({ "id": 1, "username": "test1" }))
        render(<Home />)
        await waitForElementToBeRemoved(screen.getByText('Loading...'))
        expect(screen.getByText("testWS")).toBeInTheDocument()
    })
})

describe("Page of ChatId", () => {
    test("New comming message with commig message of other chat", async () => {
        localStorage.setItem("access_token", "tokenTest")
        localStorage.setItem("user", JSON.stringify({ "id": 1, "username": "test1" }))
        render(<PageChatId params={{ chatId: 3 }}/>)
        await waitForElementToBeRemoved(screen.getByText('Loading...'))
        expect(screen.getAllByText("test message").length).toBe(5)
    })
    test("New comming message with message correct chat", async () => {
        localStorage.setItem("access_token", "tokenTest")
        localStorage.setItem("user", JSON.stringify({ "id": 1, "username": "test1" }))
        render(<PageChatId params={{ chatId: 1 }}/>)
        await waitFor(() => expect(screen.getByText("testWS")).toBeInTheDocument())
    })
    test("notFound", async () => {
        localStorage.setItem("access_token", "tokenTestIncorrect")
        localStorage.setItem("user", JSON.stringify({ "id": 1, "username": "test1" }))
        render(<PageChatId params={{ chatId: 1 }}/>)
        await waitFor(() => expect(notFound).toHaveBeenCalled())
    })
})